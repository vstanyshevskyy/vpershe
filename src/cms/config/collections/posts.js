import config from '../../../config'
const posts = {
  name: 'posts',
  label: 'Всі пости',
  folder: 'content/posts',
  create: true,
  sortableFields: ['publishTime', 'title'],
  fields: [
    {
      label: 'Type',
      name: 'contentType',
      widget: 'hidden',
      default: 'post'
    },
    {
      label: 'Категорія',
      name: 'category',
      widget: 'select',
      options: config.categories
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
          collection: 'posts',
          searchFields: [
            'title'
          ],
          displayFields: [
            'title',
            'category'
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
          collection: 'posts',
          searchFields: [
            'title'
          ],
          displayFields: [
            'title',
            'category'
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

export default posts;
