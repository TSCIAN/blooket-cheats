/**
* @license StewartPrivateLicense-2.0.1
* Copyright (c) 005Konz 2023
*
* You may not reproduce or distribute any code inside this file without the licenser's permission.
* You may not copy, modify, steal, skid, or recreate any of the code inside this file.
* You may not under any circumstance republish any code from this file as your own.
* 
* ALL TERMS STATED IN THE LINK BELOW APPLY ASWELL
* https://github.com/005Konz/Blooket-Cheats/blob/main/LICENSE
*/

/* THE UPDATE CHECKER IS ADDED DURING COMMIT PREP, THERE MAY BE REDUNDANT CODE, DO NOT TOUCH */

(() => {
    let iframe = document.querySelector("iframe");
    /* By CryptoDude3 */
    if (window.fetch.call.toString() == 'function call() { [native code] }') {
        const call = window.fetch.call;
        window.fetch.call = function () {
            if (!arguments[1].includes("s.blooket.com/rc")) return call.apply(this, arguments);
        }
    }
    const cheat = (async () => {
        let i = document.createElement('iframe');
        document.body.append(i);
        window.prompt = i.contentWindow.prompt.bind(window);
        window.alert = i.contentWindow.alert.bind(window);
        i.remove();
        let { stateNode } = Object.values((function react(r = document.querySelector("body>div")) { return Object.values(r)[1]?.children?.[0]?._owner.stateNode ? r : react(r.querySelector(":scope>div")) })())[1].children[0]._owner;
        stateNode.props.liveGameController.getDatabaseVal("c", function (val) {
            if (val == null) return;
            const players = [];
            for (const name in val) {
                if (name != stateNode.props.client.name)
                    players.push({ name, blook: val[name].b, doubloons: val[name].d || 0 });
            };
            if (players.length == 0) return alert("You're the only one here.");
            const name = prompt("Who would you like to swap with? (Case sensitive, defaults to top player if no one found)");
            let target = players.find(x => x.name == name);
            if (target == null) {
                target = players[0];
                for (let i = 1; i < players.length; i++)
                    if (players[i].doubloons > target.doubloons) target = players[i];
            }
            stateNode.props.liveGameController.setVal({
                path: "c/" + stateNode.props.client.name,
                val: {
                    b: stateNode.props.client.blook,
                    d: target.doubloons,
                    tat: target.name + ":" + (target.doubloons - stateNode.state.doubloons)
                }
            });
            stateNode.setState({ doubloons: target.doubloons });
        });
    });
    let img = new Image;
    img.src = "https://raw.githubusercontent.com/005Konz/Blooket-Cheats/main/autoupdate/timestamps/voyage/swapDoubloons.png?" + Date.now();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0, this.width, this.height);
        let { data } = ctx.getImageData(0, 0, this.width, this.height), decode = "", last;
        let i = 0;
        while (i < data.length) {
            let char = String.fromCharCode(data[i % 4 == 3 ? (i++, i++) : i++] + data[i % 4 == 3 ? (i++, i++) : i++] * 256);
            decode += char;
            if (char == "/" && last == "*") break;
            last = char;
        }
        let _, time = 1716690735146, error = "There was an error checking for script updates. Run cheat anyway?";
        try {
            [_, time, error] = decode.match(/LastUpdated: (.+?); ErrorMessage: "((.|\n)+?)"/);
        } catch (e) {}
        if (parseInt(time) <= 1716690735146 || iframe.contentWindow.confirm(error)) cheat();
    }
    img.onerror = img.onabort = () => {
        img.onerror = img.onabort = null;
        cheat();
        let iframe = document.querySelector("iframe");
        iframe.contentWindow.alert("It seems the GitHub is either blocked or down.\n\nIf it's NOT blocked, join the Discord server for updates\nhttps://discord.gg/jHjGrrdXP6\n(The cheat will still run after this alert)")
    }
})();