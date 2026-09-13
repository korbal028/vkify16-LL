/**
 * Modern (Unicode) emoji picker for the post/comment composer.
 *
 * Inserted characters are plain Unicode emoji - the engine already renders
 * them as nice cross-platform images via TRichText::formatEmojis(), so no
 * server-side changes are needed here, this is purely the picker UI.
 */
vkify.bindOnce('emojiPicker', () => {

    const EMOJI = [
        // Смайлы и эмоции
        { e: '😀', k: 'smile grin happy', c: 'Смайлы и эмоции' },
        { e: '😃', k: 'smile happy joy', c: 'Смайлы и эмоции' },
        { e: '😄', k: 'smile happy laugh', c: 'Смайлы и эмоции' },
        { e: '😁', k: 'grin smile teeth', c: 'Смайлы и эмоции' },
        { e: '😆', k: 'laugh happy squint', c: 'Смайлы и эмоции' },
        { e: '😅', k: 'sweat smile relief', c: 'Смайлы и эмоции' },
        { e: '🤣', k: 'rofl laugh floor', c: 'Смайлы и эмоции' },
        { e: '😂', k: 'joy laugh tears', c: 'Смайлы и эмоции' },
        { e: '🙂', k: 'smile slight', c: 'Смайлы и эмоции' },
        { e: '🙃', k: 'upside down smile', c: 'Смайлы и эмоции' },
        { e: '😉', k: 'wink', c: 'Смайлы и эмоции' },
        { e: '😊', k: 'smile blush happy', c: 'Смайлы и эмоции' },
        { e: '😇', k: 'angel halo innocent', c: 'Смайлы и эмоции' },
        { e: '🥰', k: 'love hearts smile', c: 'Смайлы и эмоции' },
        { e: '😍', k: 'heart eyes love', c: 'Смайлы и эмоции' },
        { e: '🤩', k: 'star struck', c: 'Смайлы и эмоции' },
        { e: '😘', k: 'kiss heart', c: 'Смайлы и эмоции' },
        { e: '😗', k: 'kiss', c: 'Смайлы и эмоции' },
        { e: '😚', k: 'kiss closed eyes', c: 'Смайлы и эмоции' },
        { e: '😙', k: 'kiss smile', c: 'Смайлы и эмоции' },
        { e: '😋', k: 'yum tongue tasty', c: 'Смайлы и эмоции' },
        { e: '😛', k: 'tongue playful', c: 'Смайлы и эмоции' },
        { e: '😜', k: 'wink tongue crazy', c: 'Смайлы и эмоции' },
        { e: '🤪', k: 'zany crazy face', c: 'Смайлы и эмоции' },
        { e: '😝', k: 'tongue squint', c: 'Смайлы и эмоции' },
        { e: '🤑', k: 'money mouth rich', c: 'Смайлы и эмоции' },
        { e: '🤗', k: 'hug smile', c: 'Смайлы и эмоции' },
        { e: '🤭', k: 'giggle oops hand', c: 'Смайлы и эмоции' },
        { e: '🤫', k: 'shush quiet', c: 'Смайлы и эмоции' },
        { e: '🤔', k: 'think hmm', c: 'Смайлы и эмоции' },
        { e: '🤐', k: 'zipper mouth silent', c: 'Смайлы и эмоции' },
        { e: '🤨', k: 'raised eyebrow suspicious', c: 'Смайлы и эмоции' },
        { e: '😐', k: 'neutral face', c: 'Смайлы и эмоции' },
        { e: '😑', k: 'expressionless', c: 'Смайлы и эмоции' },
        { e: '😶', k: 'no mouth silent', c: 'Смайлы и эмоции' },
        { e: '😏', k: 'smirk', c: 'Смайлы и эмоции' },
        { e: '😒', k: 'unamused meh', c: 'Смайлы и эмоции' },
        { e: '🙄', k: 'roll eyes', c: 'Смайлы и эмоции' },
        { e: '😬', k: 'grimace awkward', c: 'Смайлы и эмоции' },
        { e: '🤥', k: 'lying pinocchio nose', c: 'Смайлы и эмоции' },
        { e: '😌', k: 'relieved calm', c: 'Смайлы и эмоции' },
        { e: '😔', k: 'pensive sad', c: 'Смайлы и эмоции' },
        { e: '😪', k: 'sleepy tired', c: 'Смайлы и эмоции' },
        { e: '🤤', k: 'drooling', c: 'Смайлы и эмоции' },
        { e: '😴', k: 'sleep zzz', c: 'Смайлы и эмоции' },
        { e: '😷', k: 'mask sick', c: 'Смайлы и эмоции' },
        { e: '🤒', k: 'thermometer sick fever', c: 'Смайлы и эмоции' },
        { e: '🤕', k: 'bandage hurt injured', c: 'Смайлы и эмоции' },
        { e: '🤢', k: 'nauseated sick', c: 'Смайлы и эмоции' },
        { e: '🤮', k: 'vomit sick', c: 'Смайлы и эмоции' },
        { e: '🤧', k: 'sneeze sick', c: 'Смайлы и эмоции' },
        { e: '🥵', k: 'hot sweat', c: 'Смайлы и эмоции' },
        { e: '🥶', k: 'cold freezing', c: 'Смайлы и эмоции' },
        { e: '🥴', k: 'woozy dizzy drunk', c: 'Смайлы и эмоции' },
        { e: '😵', k: 'dizzy knocked out', c: 'Смайлы и эмоции' },
        { e: '🤯', k: 'mind blown explode', c: 'Смайлы и эмоции' },
        { e: '🤠', k: 'cowboy hat', c: 'Смайлы и эмоции' },
        { e: '🥳', k: 'party celebrate', c: 'Смайлы и эмоции' },
        { e: '😎', k: 'cool sunglasses', c: 'Смайлы и эмоции' },
        { e: '🤓', k: 'nerd glasses', c: 'Смайлы и эмоции' },
        { e: '🧐', k: 'monocle curious', c: 'Смайлы и эмоции' },
        { e: '😕', k: 'confused', c: 'Смайлы и эмоции' },
        { e: '😟', k: 'worried', c: 'Смайлы и эмоции' },
        { e: '🙁', k: 'frown sad', c: 'Смайлы и эмоции' },
        { e: '😮', k: 'open mouth surprised', c: 'Смайлы и эмоции' },
        { e: '😯', k: 'hushed surprised', c: 'Смайлы и эмоции' },
        { e: '😲', k: 'astonished shocked', c: 'Смайлы и эмоции' },
        { e: '😳', k: 'flushed embarrassed', c: 'Смайлы и эмоции' },
        { e: '🥺', k: 'pleading puppy eyes', c: 'Смайлы и эмоции' },
        { e: '😦', k: 'frown open mouth', c: 'Смайлы и эмоции' },
        { e: '😧', k: 'anguished', c: 'Смайлы и эмоции' },
        { e: '😨', k: 'fearful scared', c: 'Смайлы и эмоции' },
        { e: '😰', k: 'anxious sweat', c: 'Смайлы и эмоции' },
        { e: '😥', k: 'sad relieved', c: 'Смайлы и эмоции' },
        { e: '😢', k: 'cry sad tear', c: 'Смайлы и эмоции' },
        { e: '😭', k: 'sob crying loud', c: 'Смайлы и эмоции' },
        { e: '😱', k: 'scream fear', c: 'Смайлы и эмоции' },
        { e: '😖', k: 'confounded distress', c: 'Смайлы и эмоции' },
        { e: '😣', k: 'persevere struggle', c: 'Смайлы и эмоции' },
        { e: '😞', k: 'disappointed sad', c: 'Смайлы и эмоции' },
        { e: '😓', k: 'sweat downcast', c: 'Смайлы и эмоции' },
        { e: '😩', k: 'weary tired', c: 'Смайлы и эмоции' },
        { e: '😫', k: 'tired exhausted', c: 'Смайлы и эмоции' },
        { e: '🥱', k: 'yawn tired', c: 'Смайлы и эмоции' },
        { e: '😤', k: 'triumph angry huff', c: 'Смайлы и эмоции' },
        { e: '😡', k: 'rage angry red', c: 'Смайлы и эмоции' },
        { e: '😠', k: 'angry mad', c: 'Смайлы и эмоции' },
        { e: '🤬', k: 'swearing angry curse', c: 'Смайлы и эмоции' },
        { e: '😈', k: 'devil smile evil', c: 'Смайлы и эмоции' },
        { e: '👿', k: 'devil angry imp', c: 'Смайлы и эмоции' },
        { e: '💀', k: 'skull dead', c: 'Смайлы и эмоции' },
        { e: '💩', k: 'poop funny', c: 'Смайлы и эмоции' },
        { e: '🤡', k: 'clown', c: 'Смайлы и эмоции' },
        { e: '👻', k: 'ghost halloween', c: 'Смайлы и эмоции' },
        { e: '👽', k: 'alien ufo', c: 'Смайлы и эмоции' },
        { e: '🤖', k: 'robot', c: 'Смайлы и эмоции' },

        // Жесты и люди
        { e: '👋', k: 'wave hello hi', c: 'Жесты и люди' },
        { e: '🤚', k: 'raised back hand', c: 'Жесты и люди' },
        { e: '🖐️', k: 'hand fingers splayed', c: 'Жесты и люди' },
        { e: '✋', k: 'raised hand stop', c: 'Жесты и люди' },
        { e: '🖖', k: 'vulcan salute spock', c: 'Жесты и люди' },
        { e: '👌', k: 'ok hand', c: 'Жесты и люди' },
        { e: '🤏', k: 'pinch small', c: 'Жесты и люди' },
        { e: '✌️', k: 'victory peace', c: 'Жесты и люди' },
        { e: '🤞', k: 'crossed fingers luck', c: 'Жесты и люди' },
        { e: '🤟', k: 'love you gesture', c: 'Жесты и люди' },
        { e: '🤘', k: 'rock horns', c: 'Жесты и люди' },
        { e: '🤙', k: 'call me hand', c: 'Жесты и люди' },
        { e: '👈', k: 'point left', c: 'Жесты и люди' },
        { e: '👉', k: 'point right', c: 'Жесты и люди' },
        { e: '👆', k: 'point up', c: 'Жесты и люди' },
        { e: '👇', k: 'point down', c: 'Жесты и люди' },
        { e: '☝️', k: 'index up', c: 'Жесты и люди' },
        { e: '👍', k: 'thumbs up like', c: 'Жесты и люди' },
        { e: '👎', k: 'thumbs down dislike', c: 'Жесты и люди' },
        { e: '✊', k: 'fist raised', c: 'Жесты и люди' },
        { e: '👊', k: 'fist bump punch', c: 'Жесты и люди' },
        { e: '🤛', k: 'fist left', c: 'Жесты и люди' },
        { e: '🤜', k: 'fist right', c: 'Жесты и люди' },
        { e: '👏', k: 'clap applause', c: 'Жесты и люди' },
        { e: '🙌', k: 'raised hands celebrate', c: 'Жесты и люди' },
        { e: '👐', k: 'open hands', c: 'Жесты и люди' },
        { e: '🤲', k: 'palms together', c: 'Жесты и люди' },
        { e: '🙏', k: 'pray please thanks', c: 'Жесты и люди' },
        { e: '🤝', k: 'handshake deal', c: 'Жесты и люди' },
        { e: '💪', k: 'muscle strong flex', c: 'Жесты и люди' },
        { e: '🧠', k: 'brain smart', c: 'Жесты и люди' },
        { e: '👀', k: 'eyes look', c: 'Жесты и люди' },
        { e: '👶', k: 'baby', c: 'Жесты и люди' },
        { e: '🧒', k: 'child kid', c: 'Жесты и люди' },
        { e: '👦', k: 'boy', c: 'Жесты и люди' },
        { e: '👧', k: 'girl', c: 'Жесты и люди' },
        { e: '🧑', k: 'person adult', c: 'Жесты и люди' },
        { e: '👨', k: 'man', c: 'Жесты и люди' },
        { e: '👩', k: 'woman', c: 'Жесты и люди' },
        { e: '🧓', k: 'older person', c: 'Жесты и люди' },
        { e: '👴', k: 'old man grandpa', c: 'Жесты и люди' },
        { e: '👵', k: 'old woman grandma', c: 'Жесты и люди' },

        // Сердца
        { e: '❤️', k: 'red heart love', c: 'Сердца' },
        { e: '🧡', k: 'orange heart', c: 'Сердца' },
        { e: '💛', k: 'yellow heart', c: 'Сердца' },
        { e: '💚', k: 'green heart', c: 'Сердца' },
        { e: '💙', k: 'blue heart', c: 'Сердца' },
        { e: '💜', k: 'purple heart', c: 'Сердца' },
        { e: '🖤', k: 'black heart', c: 'Сердца' },
        { e: '🤍', k: 'white heart', c: 'Сердца' },
        { e: '🤎', k: 'brown heart', c: 'Сердца' },
        { e: '💔', k: 'broken heart', c: 'Сердца' },
        { e: '❣️', k: 'heart exclamation', c: 'Сердца' },
        { e: '💕', k: 'two hearts love', c: 'Сердца' },
        { e: '💞', k: 'revolving hearts', c: 'Сердца' },
        { e: '💓', k: 'beating heart', c: 'Сердца' },
        { e: '💗', k: 'growing heart', c: 'Сердца' },
        { e: '💖', k: 'sparkling heart', c: 'Сердца' },
        { e: '💘', k: 'heart arrow cupid', c: 'Сердца' },
        { e: '💝', k: 'heart gift', c: 'Сердца' },
        { e: '💟', k: 'heart decoration', c: 'Сердца' },

        // Животные и природа
        { e: '🐶', k: 'dog puppy', c: 'Животные и природа' },
        { e: '🐱', k: 'cat kitten', c: 'Животные и природа' },
        { e: '🐭', k: 'mouse', c: 'Животные и природа' },
        { e: '🐹', k: 'hamster', c: 'Животные и природа' },
        { e: '🐰', k: 'rabbit bunny', c: 'Животные и природа' },
        { e: '🦊', k: 'fox', c: 'Животные и природа' },
        { e: '🐻', k: 'bear', c: 'Животные и природа' },
        { e: '🐼', k: 'panda', c: 'Животные и природа' },
        { e: '🐨', k: 'koala', c: 'Животные и природа' },
        { e: '🐯', k: 'tiger', c: 'Животные и природа' },
        { e: '🦁', k: 'lion', c: 'Животные и природа' },
        { e: '🐮', k: 'cow', c: 'Животные и природа' },
        { e: '🐷', k: 'pig', c: 'Животные и природа' },
        { e: '🐸', k: 'frog', c: 'Животные и природа' },
        { e: '🐵', k: 'monkey', c: 'Животные и природа' },
        { e: '🐔', k: 'chicken', c: 'Животные и природа' },
        { e: '🐧', k: 'penguin', c: 'Животные и природа' },
        { e: '🐦', k: 'bird', c: 'Животные и природа' },
        { e: '🦉', k: 'owl', c: 'Животные и природа' },
        { e: '🐺', k: 'wolf', c: 'Животные и природа' },
        { e: '🐗', k: 'boar', c: 'Животные и природа' },
        { e: '🐴', k: 'horse', c: 'Животные и природа' },
        { e: '🦄', k: 'unicorn', c: 'Животные и природа' },
        { e: '🐝', k: 'bee', c: 'Животные и природа' },
        { e: '🐛', k: 'bug caterpillar', c: 'Животные и природа' },
        { e: '🦋', k: 'butterfly', c: 'Животные и природа' },
        { e: '🐌', k: 'snail', c: 'Животные и природа' },
        { e: '🐞', k: 'ladybug', c: 'Животные и природа' },
        { e: '🐢', k: 'turtle', c: 'Животные и природа' },
        { e: '🐍', k: 'snake', c: 'Животные и природа' },
        { e: '🐙', k: 'octopus', c: 'Животные и природа' },
        { e: '🐬', k: 'dolphin', c: 'Животные и природа' },
        { e: '🐳', k: 'whale', c: 'Животные и природа' },
        { e: '🐟', k: 'fish', c: 'Животные и природа' },
        { e: '🦈', k: 'shark', c: 'Животные и природа' },
        { e: '🐊', k: 'crocodile', c: 'Животные и природа' },
        { e: '🐆', k: 'leopard', c: 'Животные и природа' },
        { e: '🦓', k: 'zebra', c: 'Животные и природа' },
        { e: '🦒', k: 'giraffe', c: 'Животные и природа' },
        { e: '🐘', k: 'elephant', c: 'Животные и природа' },
        { e: '🌵', k: 'cactus', c: 'Животные и природа' },
        { e: '🌲', k: 'tree evergreen', c: 'Животные и природа' },
        { e: '🌳', k: 'tree deciduous', c: 'Животные и природа' },
        { e: '🌴', k: 'palm tree', c: 'Животные и природа' },
        { e: '🌸', k: 'blossom flower', c: 'Животные и природа' },
        { e: '🌹', k: 'rose flower', c: 'Животные и природа' },
        { e: '🌻', k: 'sunflower', c: 'Животные и природа' },
        { e: '🍀', k: 'clover luck', c: 'Животные и природа' },
        { e: '🍁', k: 'maple leaf autumn', c: 'Животные и природа' },
        { e: '☀️', k: 'sun sunny', c: 'Животные и природа' },
        { e: '🌙', k: 'moon night', c: 'Животные и природа' },
        { e: '⭐', k: 'star', c: 'Животные и природа' },
        { e: '🌈', k: 'rainbow', c: 'Животные и природа' },
        { e: '☁️', k: 'cloud', c: 'Животные и природа' },
        { e: '⛄', k: 'snowman', c: 'Животные и природа' },
        { e: '❄️', k: 'snowflake snow', c: 'Животные и природа' },
        { e: '🔥', k: 'fire hot lit', c: 'Животные и природа' },
        { e: '💧', k: 'droplet water', c: 'Животные и природа' },
        { e: '🌊', k: 'wave ocean', c: 'Животные и природа' },

        // Еда и напитки
        { e: '🍏', k: 'apple green', c: 'Еда и напитки' },
        { e: '🍎', k: 'apple red', c: 'Еда и напитки' },
        { e: '🍌', k: 'banana', c: 'Еда и напитки' },
        { e: '🍉', k: 'watermelon', c: 'Еда и напитки' },
        { e: '🍇', k: 'grapes', c: 'Еда и напитки' },
        { e: '🍓', k: 'strawberry', c: 'Еда и напитки' },
        { e: '🍒', k: 'cherries', c: 'Еда и напитки' },
        { e: '🍑', k: 'peach', c: 'Еда и напитки' },
        { e: '🍍', k: 'pineapple', c: 'Еда и напитки' },
        { e: '🥝', k: 'kiwi', c: 'Еда и напитки' },
        { e: '🍅', k: 'tomato', c: 'Еда и напитки' },
        { e: '🥑', k: 'avocado', c: 'Еда и напитки' },
        { e: '🥕', k: 'carrot', c: 'Еда и напитки' },
        { e: '🌽', k: 'corn', c: 'Еда и напитки' },
        { e: '🍕', k: 'pizza', c: 'Еда и напитки' },
        { e: '🍔', k: 'burger', c: 'Еда и напитки' },
        { e: '🍟', k: 'fries', c: 'Еда и напитки' },
        { e: '🌭', k: 'hotdog', c: 'Еда и напитки' },
        { e: '🥪', k: 'sandwich', c: 'Еда и напитки' },
        { e: '🌮', k: 'taco', c: 'Еда и напитки' },
        { e: '🍣', k: 'sushi', c: 'Еда и напитки' },
        { e: '🍜', k: 'noodles ramen', c: 'Еда и напитки' },
        { e: '🍝', k: 'pasta spaghetti', c: 'Еда и напитки' },
        { e: '🍦', k: 'ice cream soft', c: 'Еда и напитки' },
        { e: '🍩', k: 'donut', c: 'Еда и напитки' },
        { e: '🍪', k: 'cookie', c: 'Еда и напитки' },
        { e: '🎂', k: 'cake birthday', c: 'Еда и напитки' },
        { e: '🍫', k: 'chocolate', c: 'Еда и напитки' },
        { e: '🍭', k: 'lollipop candy', c: 'Еда и напитки' },
        { e: '☕', k: 'coffee', c: 'Еда и напитки' },
        { e: '🍵', k: 'tea', c: 'Еда и напитки' },
        { e: '🍺', k: 'beer', c: 'Еда и напитки' },
        { e: '🍷', k: 'wine', c: 'Еда и напитки' },
        { e: '🥂', k: 'cheers champagne', c: 'Еда и напитки' },
        { e: '🍾', k: 'champagne bottle', c: 'Еда и напитки' },

        // Активности
        { e: '⚽', k: 'soccer football', c: 'Активности' },
        { e: '🏀', k: 'basketball', c: 'Активности' },
        { e: '🏈', k: 'american football', c: 'Активности' },
        { e: '⚾', k: 'baseball', c: 'Активности' },
        { e: '🎾', k: 'tennis', c: 'Активности' },
        { e: '🏐', k: 'volleyball', c: 'Активности' },
        { e: '🎱', k: 'billiards pool', c: 'Активности' },
        { e: '🏓', k: 'ping pong', c: 'Активности' },
        { e: '🏸', k: 'badminton', c: 'Активности' },
        { e: '🥊', k: 'boxing glove', c: 'Активности' },
        { e: '🏆', k: 'trophy win', c: 'Активности' },
        { e: '🥇', k: 'gold medal', c: 'Активности' },
        { e: '🎮', k: 'video game controller', c: 'Активности' },
        { e: '🎲', k: 'dice game', c: 'Активности' },
        { e: '🎯', k: 'dart target', c: 'Активности' },
        { e: '🎳', k: 'bowling', c: 'Активности' },
        { e: '🎸', k: 'guitar music', c: 'Активности' },
        { e: '🎹', k: 'piano music', c: 'Активности' },
        { e: '🎤', k: 'microphone sing', c: 'Активности' },
        { e: '🎧', k: 'headphones music', c: 'Активности' },
        { e: '🎨', k: 'palette art', c: 'Активности' },
        { e: '🎬', k: 'clapper movie', c: 'Активности' },

        // Путешествия
        { e: '🚗', k: 'car', c: 'Путешествия' },
        { e: '🚕', k: 'taxi', c: 'Путешествия' },
        { e: '🚌', k: 'bus', c: 'Путешествия' },
        { e: '🚓', k: 'police car', c: 'Путешествия' },
        { e: '🚑', k: 'ambulance', c: 'Путешествия' },
        { e: '🚒', k: 'fire truck', c: 'Путешествия' },
        { e: '🚲', k: 'bicycle bike', c: 'Путешествия' },
        { e: '🛴', k: 'scooter', c: 'Путешествия' },
        { e: '🏍️', k: 'motorcycle', c: 'Путешествия' },
        { e: '✈️', k: 'airplane flight', c: 'Путешествия' },
        { e: '🚀', k: 'rocket space', c: 'Путешествия' },
        { e: '🚁', k: 'helicopter', c: 'Путешествия' },
        { e: '🚂', k: 'train locomotive', c: 'Путешествия' },
        { e: '🚢', k: 'ship boat', c: 'Путешествия' },
        { e: '⛵', k: 'sailboat', c: 'Путешествия' },
        { e: '🗺️', k: 'map world', c: 'Путешествия' },
        { e: '🗽', k: 'liberty statue', c: 'Путешествия' },
        { e: '🗼', k: 'tower', c: 'Путешествия' },
        { e: '🏰', k: 'castle', c: 'Путешествия' },
        { e: '🏠', k: 'house home', c: 'Путешествия' },
        { e: '🏢', k: 'office building', c: 'Путешествия' },
        { e: '⛰️', k: 'mountain', c: 'Путешествия' },
        { e: '🏖️', k: 'beach', c: 'Путешествия' },
        { e: '🏝️', k: 'island desert', c: 'Путешествия' },

        // Объекты
        { e: '💡', k: 'bulb idea light', c: 'Объекты' },
        { e: '🔦', k: 'flashlight', c: 'Объекты' },
        { e: '🕯️', k: 'candle', c: 'Объекты' },
        { e: '📱', k: 'phone mobile', c: 'Объекты' },
        { e: '💻', k: 'laptop computer', c: 'Объекты' },
        { e: '⌨️', k: 'keyboard', c: 'Объекты' },
        { e: '🖥️', k: 'desktop computer', c: 'Объекты' },
        { e: '🖨️', k: 'printer', c: 'Объекты' },
        { e: '📷', k: 'camera photo', c: 'Объекты' },
        { e: '📹', k: 'video camera', c: 'Объекты' },
        { e: '📺', k: 'tv television', c: 'Объекты' },
        { e: '📻', k: 'radio', c: 'Объекты' },
        { e: '⏰', k: 'alarm clock', c: 'Объекты' },
        { e: '⌚', k: 'watch', c: 'Объекты' },
        { e: '📚', k: 'books', c: 'Объекты' },
        { e: '📖', k: 'book open', c: 'Объекты' },
        { e: '✏️', k: 'pencil write', c: 'Объекты' },
        { e: '📝', k: 'memo note', c: 'Объекты' },
        { e: '📌', k: 'pin', c: 'Объекты' },
        { e: '📎', k: 'paperclip', c: 'Объекты' },
        { e: '✂️', k: 'scissors cut', c: 'Объекты' },
        { e: '🔒', k: 'lock closed', c: 'Объекты' },
        { e: '🔑', k: 'key', c: 'Объекты' },
        { e: '🔨', k: 'hammer tool', c: 'Объекты' },
        { e: '💰', k: 'money bag', c: 'Объекты' },
        { e: '💵', k: 'dollar money', c: 'Объекты' },
        { e: '💳', k: 'credit card', c: 'Объекты' },
        { e: '🎁', k: 'gift present', c: 'Объекты' },
        { e: '🎈', k: 'balloon', c: 'Объекты' },
        { e: '🎉', k: 'party popper celebrate', c: 'Объекты' },
        { e: '🎊', k: 'confetti ball', c: 'Объекты' },
        { e: '🔔', k: 'bell notification', c: 'Объекты' },

        // Символы
        { e: '✅', k: 'check mark done', c: 'Символы' },
        { e: '❌', k: 'cross wrong', c: 'Символы' },
        { e: '❗', k: 'exclamation warning', c: 'Символы' },
        { e: '❓', k: 'question mark', c: 'Символы' },
        { e: '💯', k: 'hundred points', c: 'Символы' },
        { e: '🔴', k: 'red circle', c: 'Символы' },
        { e: '🟠', k: 'orange circle', c: 'Символы' },
        { e: '🟡', k: 'yellow circle', c: 'Символы' },
        { e: '🟢', k: 'green circle', c: 'Символы' },
        { e: '🔵', k: 'blue circle', c: 'Символы' },
        { e: '🟣', k: 'purple circle', c: 'Символы' },
        { e: '⚫', k: 'black circle', c: 'Символы' },
        { e: '⚪', k: 'white circle', c: 'Символы' },
        { e: '⚠️', k: 'warning sign', c: 'Символы' },
        { e: '♻️', k: 'recycle', c: 'Символы' },
        { e: '💤', k: 'zzz sleep', c: 'Символы' },
        { e: '🔞', k: '18 plus nsfw', c: 'Символы' },
    ];

    let gridHtml = null;
    function buildGridHtml() {
        if (gridHtml !== null) return gridHtml;

        let html = '';
        let lastCategory = null;
        EMOJI.forEach(item => {
            if (item.c !== lastCategory) {
                html += `<div class="emoji-picker__category">${item.c}</div>`;
                lastCategory = item.c;
            }
            html += `<button type="button" class="emoji-picker__emoji" data-keywords="${item.k}" title="${item.k}">${item.e}</button>`;
        });
        gridHtml = html;
        return gridHtml;
    }

    // Заполняем сетку сразу при готовности страницы (а не лениво по показу тултипа) -
    // так надёжнее: не завязано на то, в какой момент tooltips.js перенесёт шаблон
    // внутрь .tippy-box, и работает одинаково для всех уже отрисованных композеров.
    function populateGrids(container) {
        (container || document).querySelectorAll('.emoji-picker__grid:not([data-rendered])').forEach(grid => {
            grid.dataset.rendered = '1';
            grid.innerHTML = buildGridHtml();
        });
    }

    function resolveForm(el) {
        if (!el) return null;
        const direct = el.closest('form');
        if (direct) return direct;

        const tippyBox = el.closest('.tippy-box');
        if (tippyBox) {
            const contentId = tippyBox.getAttribute('data-tippy-content-id');
            if (contentId) {
                const escaped = (window.CSS && window.CSS.escape) ? window.CSS.escape(contentId) : contentId;
                const trigger = document.querySelector('[data-tippy-content-id="' + escaped + '"]:not(.tippy-box)');
                if (trigger) return trigger.closest('form');
            }
        }
        return null;
    }

    function insertEmoji(panel, emoji) {
        const form = resolveForm(panel);
        if (!form) return;

        const textarea = form.querySelector("textarea[name='text'], textarea[name='message']");
        if (!textarea) return;

        const start = textarea.selectionStart ?? textarea.value.length;
        const end = textarea.selectionEnd ?? textarea.value.length;
        const value = textarea.value;

        textarea.value = value.slice(0, start) + emoji + value.slice(end);
        const caret = start + emoji.length;
        textarea.selectionStart = textarea.selectionEnd = caret;
        textarea.focus();

        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
    }

    vkify.hook(vkify, 'onPageReady', (container) => {
        populateGrids(container);
    }, 'after');

    vkify.ready(() => {
        populateGrids(document);
    });

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.emoji-picker__emoji');
        if (!btn) return;
        e.preventDefault();
        insertEmoji(btn.closest('.emoji-picker'), btn.textContent);
    });

    document.addEventListener('input', (e) => {
        const search = e.target.closest ? e.target.closest('.emoji-picker__search') : null;
        if (!search) return;

        const query = search.value.trim().toLowerCase();
        const grid = search.closest('.emoji-picker').querySelector('.emoji-picker__grid');
        const buttons = grid.querySelectorAll('.emoji-picker__emoji');
        const categories = grid.querySelectorAll('.emoji-picker__category');

        buttons.forEach(btn => {
            const matches = !query || (btn.dataset.keywords || '').includes(query);
            btn.hidden = !matches;
        });

        categories.forEach(cat => {
            let node = cat.nextElementSibling;
            let hasVisible = false;
            while (node && !node.classList.contains('emoji-picker__category')) {
                if (!node.hidden) hasVisible = true;
                node = node.nextElementSibling;
            }
            cat.hidden = !hasVisible;
        });
    });
});
