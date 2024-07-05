const { zokou } = require('../framework/zokou');
const traduire = require('../framework/traduction');

zokou({ nomCom: 'citation', categorie: 'Fun' }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe, arg } = commandeOptions;
  if (!verifGroupe) {
    repondre('Commande réservée au groupe uniquement');
    return;
  }

  if (!arg[0]) {
    try {
      fetch('https://animechan.xyz/api/random')
        .then((response) => response.json())
        .then(async (quote) => {
          repondre(`╔══════════════════════════╗
║   ɴᴀʀᴜᴛᴏ-ᴍᴅ                   ║
╚══════════════════════════╝

🎬 Anime: ${quote.anime}
👤 Personnage: ${quote.character}
💬 Citation: ${await traduire(quote.quote, { to: 'fr' })}

Propulsé parɴᴀʀᴜᴛᴏ`);
        });
    } catch (e) {
      repondre('Erreur lors de la génération de la citation : ' + e.message);
    }
  } else {
    const query = arg.join(' ');

    try {
      fetch('https://animechan.xyz/api/random/character?name=' + query)
        .then((response) => response.json())
        .then(async (quote) => {
          repondre(`╔══════════════════════════╗
║   ɴᴀʀᴜᴛᴏ                ║
╚══════════════════════════╝

🎬 Anime: ${quote.anime}
👤 Personnage: ${quote.character}
💬 Citation: ${await traduire(quote.quote, { to: 'fr' })}

Propulsé par ɴᴀʀᴜᴛᴏ`);
        });
    } catch (e) {
      repondre('Erreur lors de la génération de la citation : ' + e.message);
    }
  }
});
