const stories = {
  name: 'stories',
  label: 'Історії',
  folder: 'content/content',
  filter: {
    field: 'contentType',
    value: 'stories'
  },
  create: true,
  fields: [
    {
      label: 'Type',
      name: 'contentType',
      widget: 'hidden',
      default: 'stories'
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
      label: 'Фото для списку (250*250)',
      name: 'list_image',
      widget: 'image',
      required: false
    },
    {
      label: 'Фото для списку ALT',
      name: 'list_image_alt',
      widget: 'string',
      required: false
    },
    {
      label: 'Теги',
      name: 'tags',
      widget: 'list',
      default: []
    },
    {
      label: 'Цікаве для тебе',
      name: 'related_sidebar',
      widget: 'list',
      required: false,
      fields: [
        {
          widget: 'relation',
          label: 'URL',
          hint: 'Шукай за назвою',
          name: 'path',
          collection: 'content',
          searchFields: [
            'title'
          ],
          displayFields: [
            'title',
            'contentType'
          ],
          valueField: 'path'
        }
      ]
    },
    {
      label: 'Схожі матеріали',
      name: 'related_bottom',
      widget: 'list',
      required: false,
      fields: [
        {
          widget: 'relation',
          label: 'URL',
          hint: 'Шукай за назвою',
          name: 'path',
          collection: 'content',
          searchFields: [
            'title'
          ],
          displayFields: [
            'title',
            'contentType'
          ],
          valueField: 'path'
        }
      ]
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

export default stories;
