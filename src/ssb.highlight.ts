const ATTRIBUTES = {
  begin: '(.*?):',
  end: '$',
  className: 'ssb-attribute',
  returnBegin: true,
  excludeEnd: true,
  contains: [
    {
      begin: '(.*?):',
      className: 'ssb-attribute-name'
    },
    {
      className: 'ssb-attribute-value',
      endsWithParent: true
    }
  ]
};

const MACRO_INSERT = {
  begin: '\\${',
  end: '}',
  className: 'ssb-macro-insert'
};

const EVENT_LINE_RULES = [{
    begin: '\\[',
    end: '\\]',
    className: 'ssb-event',
    contains: [
      MACRO_INSERT
    ]
  },
    MACRO_INSERT
];

const EVENT_LINE = {
  endsWithParent: true,
  className: 'ssb-event-line',
  contains: EVENT_LINE_RULES
};

const COMMENT_LINE = {
  begin: '//(.*)$',
  className: 'ssb-comment'
};

const INFO_SECTION_RULES = [
    COMMENT_LINE,
    {
      begin: '#INFO',
      className: 'ssb-section-title'
    },
    ATTRIBUTES
  ];

const TARGET_SECTION_RULES = [
    COMMENT_LINE,
    {
      begin: '#TARGET',
      className: 'ssb-section-title'
    },
    ATTRIBUTES
  ];

const MACROS_SECTION_RULES = [
    COMMENT_LINE,
    {
      begin: '#MACROS',
      className: 'ssb-section-title'
    },
    {
      begin: '(.*?):',
      end: '$',
      className: 'ssb-attribute',
      returnBegin: true,
      excludeEnd: true,
      contains: [
        {
          begin: '^(.*?):',
          className: 'ssb-macro-name'
        },
        // this matches everything not matched yet but would match everything until the end of the document, so we need endsWithParent:true
        {
          className: 'ssb-macro-value',
          endsWithParent: true,
          contains: [EVENT_LINE]
        }
      ]
    }
  ];

const EVENTS_SECTION_RULES = [
    COMMENT_LINE,
    {
      begin: '#EVENTS',
      className: 'ssb-section-title'
    },
    {
      begin: '^[^/][^/](.*?)[|](.*?)[|](.*?)[|](.*)',
      end: '$',
      className: 'ssb-event',
      returnBegin: true,
      returnEnd: true,
      contains: [
        {
          begin: '^(.*?)(?=[|](.*?)[|](.*?)[|](.*))',
          className: 'ssb-event-timestamp'
        },
        {
          begin: '[|]',
          className: 'ssb-event-separator'
        },
        {
          begin: '(.*?)(?=[|](.*?)[|](.*))',
          className: 'ssb-event-macro'
        },
        {
          begin: '(.*?)(?=[|](.*))',
          className: 'ssb-comment'
        },
        {
          className: 'ssb-event-text',
          contains: [
            EVENT_LINE
          ],
          endsWithParent: true
        }
      ]
    }
  ];

const RESOURCES_SECTION_RULES = [
    COMMENT_LINE,
    {
      begin: '#RESOURCES',
      className: 'ssb-section-title'
    },
    ATTRIBUTES
  ];

export const SSBHlJS = function(hljs) {
  return {
    aliases: ['ssb'],
    contains: [
      {
        begin: '(?=#INFO)',
        end: '(?![^#])',
        className: 'ssb-section',
        contains: INFO_SECTION_RULES
      },
      {
        begin: '(?=#TARGET)',
        end: '(?![^#])',
        className: 'ssb-section',
        contains: TARGET_SECTION_RULES
      },
      {
        begin: '(?=#MACROS)',
        end: '(?![^#])',
        className: 'ssb-section',
        contains: MACROS_SECTION_RULES
      },
      {
        begin: '(?=#EVENTS)',
        end: '(?![^#])',
        className: 'ssb-section',
        contains: EVENTS_SECTION_RULES
      },
      {
        begin: '(?=#RESOURCES)',
        end: '(?![^#])',
        className: 'ssb-section',
        contains: RESOURCES_SECTION_RULES
      }
    ]
  };
};

export const SSBHlJS_INFO_SECTION = function(hljs) {
  return {
    aliases: ['ssb-info-section'],
    contains: INFO_SECTION_RULES
  };
};

export const SSBHlJS_TARGET_SECTION = function(hljs) {
  return {
    aliases: ['ssb-target-section'],
    contains: TARGET_SECTION_RULES
  };
};

export const SSBHlJS_MACROS_SECTION = function(hljs) {
  return {
    aliases: ['ssb-macros-section'],
    contains: MACROS_SECTION_RULES
  };
};

export const SSBHlJS_EVENTS_SECTION = function(hljs) {
  return {
    aliases: ['ssb-events-section'],
    contains: EVENTS_SECTION_RULES
  };
};

export const SSBHlJS_RESOURCES_SECTION = function(hljs) {
  return {
    aliases: ['ssb-resources-section'],
    contains: RESOURCES_SECTION_RULES
  };
};

export const SSBHlJS_EVENT = function(hljs) {
  return {
    aliases: ['ssb-event'],
    contains: [{
      className: 'ssb-event-line',
      contains: EVENT_LINE_RULES,
      endsWithParent: true
    }]
  };
};
