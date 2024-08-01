const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
┌───═[ *PREXZY-BOT* ]═──▸
│╭────────────···▸
┴│▸
⬡│▸ *Prefix* : ${s.PREFIXE}
⬡│▸ *Owner* : ${s.OWNER_NAME}
⬡│▸  *Plugins* :-${cm.length}
⬡│▸   *Mode* : ${mode}
⬡│▸  *Mémoire* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
⬡│▸ *Date* *Time* : ${date} ${temps}
⬡│ *Developer* : Prexzybooster  & Toxxic Boy
┬│▸
│╰─────────────···▸
└───────────────···▸ \n\n`;
    
let menuMsg = `
👋 Hello ${nomAuteurMessage} 👋

*Here Is My Beautiful Menu :*
◇                             ◇
`;

    for (const cat in coms) {
        menuMsg += `┌───〈 *${cat}* 〉───◆`;
        for (const cmd of coms[cat]) {
            menuMsg += `
│ ${cmd}`;
        }
        menuMsg += `
╰────────────···▸▸ \n`
    }

    menuMsg += `
◇            ◇
*»»————— ★ —————««*
"To use a command, insert ${prefixe} followed by the command_name."
 
    Powered by  MR-PREXZY-V1
                                                
*»»————— ★ —————««*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "I am MR-PREXZY-V1, Made by  Prexzybooster" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "I am MR-PREXZY-V1, Made by  Prexzybooster" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu error " + e);
        repondre("🥵🥵 Menu error " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
