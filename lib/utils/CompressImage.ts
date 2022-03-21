interface Props {
  file: File;
  getFile: (file: File) => void;
}

const CompressImage = ({ file, getFile }: Props) => {
  if (file.type && !file.type.includes('image')) {
    throw Error('File Is NOT Image!');
  }

  const reader: FileReader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => {
    const image: HTMLImageElement = new Image() as HTMLImageElement;

    image.src = reader.result as string;
    image.onload = () => {
      //compress image with canvas
      const canvas = document.createElement('canvas');
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0, image.width, image.height);

      //add timestamp to file name
      const fileName = file.name;
      const fileNameWithoutFormat = fileName
        .toString()
        .replace(/(.png|.jpeg|.jpg|.webp|' ')$/i, `${+new Date()}`);
      const newFileName = fileNameWithoutFormat.concat('.jpeg');

      canvas.toBlob(
        (blob) => {
          const newFile = new File([blob as BlobPart], newFileName, { type: 'image/jpeg' });

          getFile(newFile);
        },
        'image/jpeg',
        0.5 //quality
      );
    };
  };
};

export default CompressImage;
