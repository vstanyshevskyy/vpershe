const pages = {
  name: 'pages',
  label: 'Інші сторінки',
  folder: 'content/pages',
  create: true,
  fields: [
    {
      label: 'Type',
      name: 'contentType',
      widget: 'hidden',
      default: 'pages'
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
    },
    {
      label: 'Фото',
      name: 'image',
      widget: 'image',
      required: false
    },
    {
      label: 'Фото ALT',
      name: 'image_alt',
      widget: 'string',
      required: false
    },
    {
      label: 'Додати до каруселі на головній',
      name: 'carousel_featured',
      widget: 'boolean',
      required: false
    },
    {
      label: 'Фото для каруселі на головній (170*170)',
      name: 'carousel_image',
      widget: 'image',
      required: false
    },
    {
      label: 'Фото для каруселі ALT',
      name: 'carousel_image_alt',
      widget: 'string',
      required: false
    },
    {
      label: 'Текст',
      name: 'body',
      widget: 'markdown'
    },
    {
      label: 'Час публікації',
      name: 'publishTime',
      required: false,
      widget: 'datetime'
    },
    {
      label: 'Meta Keywords',
      name: 'metaKeywords',
      widget: 'string',
      required: false
    },
    {
      label: 'Meta Description',
      name: 'metaDescription',
      widget: 'string',
      required: false
    }
  ]
};

export default pages;
