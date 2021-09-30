const settings = {
  name: 'settings',
  label: 'Налаштування',
  files: [
    {
      label: 'Загальні',
      name: 'general',
      file: 'content/settings/general.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'general_settings'
        },
        {
          label: 'favicon',
          name: 'favicon',
          widget: 'image'
        },
        {
          label: 'URL сайту',
          name: 'url',
          widget: 'string'
        },
        {
          label: 'Назва організації, від імені якої постимо контент',
          name: 'organizationTitle',
          widget: 'string'
        },
        {
          label: 'Автор по замовчуванню',
          name: 'defaultAuthor',
          widget: 'string'
        },
        {
          label: 'Фото автора по замовчуванню',
          name: 'defaultAuthorImage',
          widget: 'image'
        },
        {
          label: 'Title Template',
          name: 'titleTemplate',
          widget: 'string'
        },
        {
          label: 'Title (Текст заголовку вікна браузера на головній)',
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Meta Description',
          name: 'metaDescription',
          widget: 'string'
        },
        {
          label: 'Meta Keywords',
          name: 'metaKeywords',
          widget: 'string'
        },
        {
          label: 'FB Title (цей текст показуватиме ФБ при шерінгу сторінки)',
          name: 'fbTitle',
          widget: 'string'
        },
        {
          label: 'FB Description',
          name: 'fbDescription',
          widget: 'string'
        },
        {
          label: 'FB Image',
          name: 'fbImage',
          widget: 'image'
        }
      ]
    },
    {
      label: 'Головна сторінка',
      name: 'homepage',
      file: 'content/settings/homepage.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'homepage_settings'
        },
        {
          label: 'Про проект',
          name: 'body',
          widget: 'markdown'
        }
      ]
    },
    {
      label: 'Команда',
      name: 'team',
      file: 'content/settings/team.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'team'
        },
        {
          label: 'Група',
          name: 'groups',
          widget: 'list',
          default: [],
          fields: [
            {
              label: 'Назва',
              name: 'name',
              widget: 'string',
              default: ''
            },
            {
              label: 'Кількість в рядку (3/4)',
              name: 'perLine',
              widget: 'number',
              default: 3,
              valueType: 'int',
              min: 3,
              max: 4
            },
            {
              label: 'Люди',
              name: 'people',
              widget: 'list',
              fields: [
                {
                  label: 'Людина',
                  name: 'person',
                  widget: 'object',
                  fields: [
                    {
                      label: "Ім'я Прізвище",
                      name: 'name',
                      widget: 'string'
                    },
                    {
                      label: 'Роль',
                      name: 'role',
                      widget: 'string',
                      required: false
                    },
                    {
                      label: 'Email',
                      name: 'email',
                      widget: 'string',
                      required: false
                    },
                    {
                      label: 'Деталі',
                      name: 'details',
                      widget: 'string',
                      required: false
                    },
                    {
                      label: 'Фото',
                      name: 'photo',
                      widget: 'image',
                      required: true
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'Page Title',
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Meta Description',
          name: 'metaDescription',
          widget: 'string'
        },
        {
          label: 'Meta Keywords',
          name: 'metaKeywords',
          widget: 'string'
        },
        {
          label: 'FB Image',
          name: 'fbImage',
          widget: 'image'
        }
      ]
    },
    {
      label: 'Секс',
      name: 'sex',
      file: 'content/settings/sex.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'sex_settings'
        },
        {
          label: 'Page Title',
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Meta Description',
          name: 'metaDescription',
          widget: 'string'
        },
        {
          label: 'Meta Keywords',
          name: 'metaKeywords',
          widget: 'string'
        },
        {
          label: 'Tag Page Title',
          name: 'tags_title',
          widget: 'string'
        },
        {
          label: 'Tags Meta Description',
          name: 'tags_metaDescription',
          widget: 'string'
        },
        {
          label: 'Tags Meta Keywords',
          name: 'tags_metaKeywords',
          widget: 'string'
        }
      ]
    },
    {
      label: 'Тіло',
      name: 'body',
      file: 'content/settings/body.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'body_settings'
        },
        {
          label: 'Page Title',
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Meta Description',
          name: 'metaDescription',
          widget: 'string'
        },
        {
          label: 'Meta Keywords',
          name: 'metaKeywords',
          widget: 'string'
        },
        {
          label: 'Tag Page Title',
          name: 'tags_title',
          widget: 'string'
        },
        {
          label: 'Tags Meta Description',
          name: 'tags_metaDescription',
          widget: 'string'
        },
        {
          label: 'Tags Meta Keywords',
          name: 'tags_metaKeywords',
          widget: 'string'
        }
      ]
    },
    {
      label: 'Стосунки',
      name: 'relationships',
      file: 'content/settings/relationships.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'relationships_settings'
        },
        {
          label: 'Page Title',
          name: 'title',
          widget: 'string'
        },
        {
          label: 'Meta Description',
          name: 'metaDescription',
          widget: 'string'
        },
        {
          label: 'Meta Keywords',
          name: 'metaKeywords',
          widget: 'string'
        },
        {
          label: 'Tag Page Title',
          name: 'tags_title',
          widget: 'string'
        },
        {
          label: 'Tags Meta Description',
          name: 'tags_metaDescription',
          widget: 'string'
        },
        {
          label: 'Tags Meta Keywords',
          name: 'tags_metaKeywords',
          widget: 'string'
        }
      ]
    },
    {
      label: 'Підписка на новини',
      name: 'subscribe_form_settings',
      file: 'content/settings/subscribe_form.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'subscribe_form_settings'
        },
        {
          label: 'Заголовок',
          name: 'title',
          widget: 'string'
        },
        {
          label: 'email placeholder',
          name: 'email_placeholder',
          widget: 'string'
        },
        {
          label: 'Опис поля email',
          name: 'email_label',
          widget: 'string'
        },
        {
          label: 'Текст на кнопці',
          name: 'button_text',
          widget: 'string'
        },
        {
          label: 'Заголовок подяки',
          name: 'thanks_title',
          widget: 'string'
        },
        {
          label: 'Текст подяки',
          name: 'thanks_text',
          widget: 'string'
        }
      ]
    },
    {
      label: 'Ask Box',
      name: 'ask_box_settings',
      file: 'content/settings/ask_box.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'ask_box_settings'
        },
        {
          label: 'Текст на кнопці-відкривашці',
          name: 'toggleButtonText',
          widget: 'string'
        },
        {
          label: 'Текст на початку форми',
          name: 'formInstructions',
          widget: 'string'
        },
        {
          label: 'Email Label',
          name: 'emailLabel',
          widget: 'string'
        },
        {
          label: 'Текст згоди',
          name: 'allowToShareLabel',
          widget: 'string'
        },
        {
          label: 'Згоден',
          name: 'yesLabel',
          widget: 'string'
        },
        {
          label: 'Не згоден',
          name: 'noLabel',
          widget: 'string'
        },
        {
          label: 'Question area label',
          name: 'questionAreaLabel',
          widget: 'string'
        },
        {
          label: 'Текст кнопки відправити',
          name: 'submitButtonText',
          widget: 'string'
        },
        {
          label: 'Заголовок подяки',
          name: 'thanksTitle',
          widget: 'string'
        },
        {
          label: 'Текст подяки, якщо погодились на поширення',
          name: 'thanksTextAllowedToShare',
          widget: 'string'
        },
        {
          label: 'Текст подяки, якщо НЕ погодились на поширення',
          name: 'thanksTextNotAllowedToShare',
          widget: 'string'
        }
      ]
    },
    {
      label: 'Футер',
      name: 'footer',
      file: 'content/settings/footer.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'footer_settings'
        },
        {
          label: 'Копірайт',
          name: 'copyrightText',
          widget: 'string'
        },
        {
          label: 'Посилання в самом у низу',
          name: 'bottomLinks',
          widget: 'list',
          fields: [
            {
              label: 'Текст',
              name: 'text',
              widget: 'string',
              default: ''
            },
            {
              label: 'URL',
              name: 'url',
              widget: 'string',
              default: ''
            }
          ]
        }
      ]
    },
    {
      label: 'Навігація',
      name: 'navbar',
      file: 'content/settings/navbar.md',
      fields: [
        {
          name: 'contentType',
          widget: 'hidden',
          default: 'navbar_settings'
        },
        {
          label: 'Меню',
          name: 'links',
          widget: 'list',
          fields: [
            {
              label: 'Текст',
              name: 'text',
              widget: 'string'
            },
            {
              label: 'Посилання',
              name: 'url',
              widget: 'string'
            }
          ]
        },
        {
          label: 'Соцмережі',
          name: 'socialIcons',
          widget: 'list',
          fields: [
            {
              label: 'Мережа',
              name: 'type',
              widget: 'select',
              options: [
                'Facebook',
                'Twitter',
                'Instagram',
                'Google'
              ]
            },
            {
              label: 'Посилання',
              name: 'url',
              widget: 'string'
            }
          ]
        }
      ]
    }
  ]
};

export default settings;
