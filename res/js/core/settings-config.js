(function () {
    if (!window.vkify) return;

    const body = document.body;

    function setThemeSwitching() {
        body.classList.add('theme-switching');
        setTimeout(() => body.classList.remove('theme-switching'), 500);
    }

    function toggleTheme(enabled, bodyClass, styleId, styleName) {
        setThemeSwitching();
        body.classList.toggle(bodyClass, enabled);
        if (enabled) vkify.loadStyle(null, styleId, `${vkify.resourceUrl('css')}/${styleName}`);
        else vkify.unloadStyle(styleId);
    }

    function syncOvkHat(enabled) {
        const homeButton = document.querySelector('.home_button');
        if (!homeButton) return;

        u(body).toggleClass('ovkhat', enabled);

        const favicon = document.querySelector('link[rel="shortcut icon"]');
        if (favicon) {
            const icoName = enabled ? 'ovk.ico' : 'default.ico';
            favicon.href = vkify.resourceUrl('icons') + '/' + icoName;
        }

        if (enabled) {
            const instanceName = homeButton.querySelector('.instance_name');
            if (instanceName) instanceName.remove();
            return;
        }

        const title = homeButton.getAttribute('title');
        if (title && title !== 'OpenVK' && !homeButton.querySelector('.instance_name')) {
            const span = document.createElement('span');
            span.className = 'instance_name';
            span.textContent = title;
            homeButton.appendChild(span);
        }
    }

    vkify.registerSetting('darkMode', false, 'vkify16_darkmode');
    vkify.registerSetting('mode2018', false, 'vkify16_2018mode');
    vkify.registerSetting('vkGraffiti', false, 'vkify16_graffiti');
    vkify.registerSetting('ovkHat', true, 'ovkhat');
    vkify.registerSetting('imWide', false, 'vkify16_im_wide');

    // широкоэкранный мессенджер: cookie для сервера, на странице сообщений перестраиваем вид на месте
    window.toggleImWide = function (enabled) {
        vkify.setSetting('imWide', enabled);
        document.querySelectorAll('.im-wide-toggle--input').forEach((cb) => { cb.checked = enabled; });

        const layout = document.querySelector('.im-layout');
        if (!layout) return;

        clearTimeout(layout.__imSwitchTimer);
        // раскладка раздвигается или сужается плавно, как в vkify16
        document.body.classList.toggle('im-wide-page', enabled);

        const apply = () => {
            layout.classList.remove('im-layout_collapsing', 'im-layout_switching');
            layout.classList.toggle('im-layout_wide', enabled);
            void layout.offsetWidth;
            layout.classList.add('im-layout_switching');
            layout.__imSwitchTimer = setTimeout(() => layout.classList.remove('im-layout_switching'), 350);

            document.dispatchEvent(new CustomEvent('im:layout', { detail: { wide: enabled } }));
        };

        // при выключении сначала доигрываем анимацию широкого вида, потом перестраиваем
        const collapse = !enabled && layout.classList.contains('im-layout_wide') && !window.matchMedia('(max-width: 768px)').matches;
        if (collapse) {
            layout.classList.add('im-layout_collapsing');
            layout.__imSwitchTimer = setTimeout(apply, 200);
        } else {
            apply();
        }
    };

    window.toggleDarkMode = function (enabled) {
        toggleTheme(enabled, 'dark-mode', 'dark-mode-css', 'dark-mode.css');
    };

    window.toggle2018Mode = function (enabled) {
        toggleTheme(enabled, 'mode-2018', '2018-mode-css', '2018.css');
    };

    if (vkify.getSetting('darkMode')) {
        window.toggleDarkMode(true);
    }
    if (vkify.getSetting('mode2018')) {
        window.toggle2018Mode(true);
    }
    window.toggleOvkHat = (enabled) => {
        syncOvkHat(enabled);
    };
    if (vkify.getSetting('ovkHat')) window.toggleOvkHat(true);
    else window.toggleOvkHat(false);

    function bindSettingsToggles() {
        const bindToggle = (name, settingKey, applyFn) => {
            const cb = document.querySelector(`#vkifySettings input[name="${name}"]`);
            if (!cb || cb.dataset.vkifyBound) return;
            cb.dataset.vkifyBound = '1';
            cb.checked = !!vkify.getSetting(settingKey);
            cb.onchange = function() {
                vkify.setSetting(settingKey, this.checked);
                if (applyFn) applyFn(this.checked);
                window.vkifyShowSavedLabel?.(this);
            };
        };
        bindToggle('theme_mode', 'darkMode', window.toggleDarkMode);
        bindToggle('mode_2018', 'mode2018', window.toggle2018Mode);
        bindToggle('vkgraffiti', 'vkGraffiti', null);
        bindToggle('ovkhat', 'ovkHat', window.toggleOvkHat);
        bindToggle('im_wide', 'imWide', null);
    }

    vkify.hook(vkify, 'onPageReady', bindSettingsToggles, 'after');
})();
