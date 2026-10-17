// Окно "Новое сообщение" со страницы пользователя (кнопка .js-send-message)
(function () {
'use strict';

if (window.__vkifySendMessageBound) return;
window.__vkifySendMessageBound = true;

const csrf = () => window.router?.csrf ?? u('meta[name=csrf]').attr('value');

const post = async (peerId, data) => {
    const fd = new FormData();
    fd.set('hash', csrf());
    Object.entries(data).forEach(([k, v]) => fd.set(k, v));

    const res = await fetch(`/im/api/messages${peerId}/create.json`, { method: 'POST', body: fd });
    if (res.status !== 202) throw new Error(res.status);
};

const ATTACH_ITEMS = [
    ['__vkifyPhotoAttachment', 'attach_photo', 'photo'],
    ['__vkifyVideoAttachment', 'attach_video', 'video'],
    ['__vkifyAudioAttachment', 'attach_audio', 'audio'],
    ['__vkifyDocumentAttachment', 'attach_document', 'document'],
];

const openSendMessage = (data) => {
    const name = escapeHtml(data.name ?? '');
    const url = escapeHtml(data.url ?? '');
    const menuId = `imSendAttach${Date.now()}`;

    const msg = new CMessageBox({
        title: escapeHtml(tr('send_message')),
        body: `
            <div class="im-send-box--peer">
                <a href="${url}"><img src="${escapeHtml(data.avatar ?? '')}" alt="${name}" /></a>
                <div class="im-send-box--peer-info">
                    <a class="im-send-box--name" href="${url}">${name}</a>
                    <div class="im-send-box--online">${escapeHtml(data.online ?? '')}</div>
                </div>
                <a href="/im?sel=${encodeURIComponent(data.id)}">${escapeHtml(tr('go_to_dialog'))}</a>
            </div>
            <form class="im-send-box--form" onsubmit="return false;">
                <div class="im-chat-input--field">
                    <textarea name="message" class="small-textarea" placeholder="${escapeHtml(tr('enter_message'))}"></textarea>
                    <a class="im-chat-input--smile js-emoji-picker" data-tabs="emoji stickers gifs" title="${escapeHtml(tr('smiles'))}"></a>
                </div>
                <div class="post-horizontal"></div>
                <div class="post-vertical"></div>
                <div class="im-send-box--bar">
                    <a class="im-send-box--attach" data-tippy-content-id="${menuId}" data-tippy-append-to="body" data-tippy-placement="bottom-start" data-tippy-trigger="click">${escapeHtml(tr('attach'))}</a>
                    <div class="tippy-menu tippy-content-template" id="${menuId}">
                        ${ATTACH_ITEMS.map(([id, cls, label]) => `
                            <a id="${id}" class="${cls}">
                                <div class="post-attach-menu__icon"></div>
                                ${escapeHtml(tr(label))}
                            </a>
                        `).join('')}
                    </div>
                </div>
            </form>
        `,
        buttons: [tr('send'), tr('cancel')],
        close_on_buttons: false,
        callbacks: [() => send(), () => msg.close()],
    });

    const node = msg.getNode();
    node.addClass('im-send-box');

    const form = node.find('.im-send-box--form').first();
    const textarea = form.querySelector('textarea');
    const sendBtn = node.find('.ovk-diag-action .button').first();
    node.find('.ovk-diag-action .button').last()?.classList.add('button_gray');

    const done = () => {
        msg.close();
        NewNotification(tr('message_sent'), '', null, Function.noop, 3000);
    };

    const send = async () => {
        const text = textarea.value;
        const attachments = collect_attachments(u(form));
        if (text.trim() === '' && attachments.length === 0) {
            textarea.focus();
            return;
        }

        sendBtn.disabled = true;
        const payload = { content: text };
        if (attachments.length > 0) payload.attachments = attachments.join(',');

        try {
            await post(data.id, payload);
            done();
        } catch (err) {
            sendBtn.disabled = false;
            fastError(tr('messages_error_1'));
        }
    };

    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            send();
        }
    });

    // стикер уходит сразу отдельным сообщением
    form.addEventListener('sticker:send', async (e) => {
        e.preventDefault();
        try {
            await post(data.id, { content: '', attachments: 'sticker' + e.detail.id });
            done();
        } catch (err) {
            fastError(tr('messages_error_1'));
        }
    });

    textarea.focus();
};

// в фазе захвата, раньше ajax-роутера
document.addEventListener('click', (e) => {
    const link = e.target.closest?.('.js-send-message');
    if (!link || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    if (window.isMobile?.()) return;

    e.preventDefault();
    openSendMessage(link.dataset);
}, true);

window.openSendMessageBox = openSendMessage;

})();
