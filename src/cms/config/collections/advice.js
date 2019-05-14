const advice = {
  name: 'advice',
  label: 'Поради',
  folder: 'content/advice',
  create: true,
  fields: [
    {
      label: 'Type',
      name: 'contentType',
      widget: 'hidden',
      default: 'advice'
    },
    {
      label: 'Заголовок',
      name: 'title',
      widget: 'string'
    },
    {
      label: 'Url',
      name: 'url',
      widget: 'string'
    },
    {
      label: 'Текст',
      name: 'body',
      widget: 'markdown'
    },
    {
      label: 'Теги',
      name: 'tags',
      widget: 'list',
      default: []
    },
    {
      label: 'Час публікації',
      name: 'publishTime',
      required: false,
      widget: 'datetime'
    }
  ]
};

export default advice;
