const Jimp = require('jimp');

class Image {
  static async skillBar(skills) {
    const canvas = new Jimp(250, 125, 0x0);
    const bar = await Jimp.read('./assets/SkillBar.png');
    const icons = skills.map((s) => Jimp.read(`./assets/${s.legend_ref}/${s.ref}.png`).then((x) => x.resize(45, 45)));

    let i = 0;
    for await (const icon of icons) {
      canvas.composite(icon, i * 68 + 34, 40);
      i++;
    }
    canvas.composite(bar, 0, 0);
    return canvas.getBufferAsync(Jimp.MIME_PNG);
  }
}

module.exports = Image;
