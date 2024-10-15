type params = {
  nameAndSurname: string;
  circleColor: string;
  fontColor: string;
  fontName: string;
  fontSize: number;
  fileName?: string;
  isBold?: boolean;
  size?: number;
};

const convertBase64ToFile = (data: string, fileName: string): File | null => {
  const arr = data.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  if (!mime) {
    return null;
  }
  const bstr = atob(arr[arr.length - 1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

const initialsAvatarGen = ({
  nameAndSurname,
  circleColor,
  fontColor,
  fontName,
  fontSize,
  fileName,
  isBold = true,
  size = 200,
}: params): { toBase64: () => string | null; toFile: () => File | null; toBlob: () => Promise<Blob | null> } | null => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!canvas || !ctx) {
      throw new Error('No canvas or context');
    }
    canvas.style.display = 'none';
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = circleColor;
    ctx.fill();

    ctx.font = `${isBold ? 'bold ' : ''} ${fontSize}px ${fontName}`;
    ctx.fillStyle = fontColor || '#FFFFFF';

    const [first = '', last = ''] = nameAndSurname.split(' ');
    const text = `${first[0] || 'S'}${last[0] || ''}`.toUpperCase();

    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

    ctx.fillText(text, canvas.width / 2 - textWidth / 2, canvas.height / 2 + textHeight / 2);
    return {
      toBase64: () => canvas.toDataURL(),
      toFile: () => convertBase64ToFile(canvas.toDataURL(), fileName || `default${new Date().valueOf()}.png`),
      toBlob: () => new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b))),
    };
  } catch (err) {
    console.error(err, 'AVATAR GEN ERROR');
    return null;
  }
};

export default initialsAvatarGen;