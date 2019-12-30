// string -> DOM
const parseTemplateToDOM = (template) => {
  const type = "text/html";
  const parsedDOM = new DOMParser().parseFromString(template, type);

  return parsedDOM.body.childNodes[0];
};

const PhotoImage = (src) => {
  const template = `
    <img 
      src=${src}
      class="img"
    />
  `
  // DOM 으로 변환해서 리턴
  return parseTemplateToDOM(template);
};

export default PhotoImage;