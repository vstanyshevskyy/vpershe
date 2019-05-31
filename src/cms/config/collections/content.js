const content = {
  name: 'content',
  label: 'Весь контент - краще не чіпати',
  folder: 'content/content',
  create: false,
  fields: [
    {
      label: 'Type',
      name: 'contentType',
      widget: 'hidden',
      default: 'articles'
    },
    {
      label: 'Url',
      name: 'path',
      widget: 'string'
    },
    {
      label: 'Заголовок',
      name: 'title',
      widget: 'string'
    },
    {
      label: 'Підзаголовок',
      name: 'subtitle',
      widget: 'string'
    }
  ]
};

export default content;
