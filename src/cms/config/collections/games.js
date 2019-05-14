const optionsFields = {
  label: 'Варіанти',
  name: 'options',
  widget: 'list',
  required: false,
  default: [],
  fields: [{
    widget: 'string',
    label: 'Текст кнопки',
    required: false,
    name: 'buttonText'
  }, {
    widget: 'string',
    label: 'Заголовок',
    name: 'title',
    required: false
  }, {
    label: 'Зображення',
    name: 'image',
    widget: 'image',
    required: false
  }, {
    label: 'Текст',
    name: 'text',
    required: false,
    widget: 'string'
  }, {
    label: 'Посилання',
    name: 'link',
    required: false,
    widget: 'relation',
    hint: 'Шукай за назвою',
    collection: 'content',
    searchFields: [
      'title'
    ],
    displayFields: [
      'title',
      'contentType'
    ],
    valueField: 'path'
  }]
};

const generateGameEditor = (times = 10) => {
  const editor = JSON.parse(JSON.stringify(optionsFields));
  let newEditor = editor.fields;
  for (let i = 0; i < times; i++) {
    newEditor.push(JSON.parse(JSON.stringify(optionsFields)));
    newEditor = newEditor[newEditor.length - 1].fields;
  }
  return editor;
};

const games = {
  name: 'games',
  label: 'Інтерактив',
  filter: {
    field: 'contentType',
    value: 'games'
  },
  folder: 'content/games',
  create: true,
  fields: [
    {
      label: 'Type', name: 'contentType', widget: 'hidden', default: 'games'
    },
    { label: 'Url', name: 'path', widget: 'string' },
    { label: 'Заголовок', name: 'title', widget: 'string' },
    { label: 'Мініатюра для списку', name: 'bannerUrl', widget: 'string' },
    {
      label: 'Час публікації', name: 'publishTime', required: false, widget: 'datetime'
    },
    {
      label: 'Meta Keywords', name: 'metaKeywords', widget: 'string', required: false
    },
    generateGameEditor()
  ]
};

export default games;
