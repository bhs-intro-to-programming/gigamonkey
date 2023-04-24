const doc = Object.fromEntries([...document.querySelectorAll('[id]')].map(e => [e.id, e]));

const fillReference = () => {

  const w = 500;
  const h = doc.image.naturalHeight * w / doc.image.naturalWidth;

  doc.reference.width = w
  doc.reference.height = h;

  doc.generated.width = w;
  doc.generated.height = h;

  doc.reference.getContext('2d').drawImage(doc.image, 0, 0, w, h);
};


doc.image.onload = fillReference;
