declare const hljs;
import {
  SSBHlJS,
  SSBHlJS_INFO_SECTION,
  SSBHlJS_TARGET_SECTION,
  SSBHlJS_EVENTS_SECTION,
  SSBHlJS_MACROS_SECTION,
  SSBHlJS_RESOURCES_SECTION,
  SSBHlJS_EVENT
} from "./ssb.highlight";

hljs.registerLanguage('ssb', SSBHlJS);
hljs.registerLanguage('ssb-info-section', SSBHlJS_INFO_SECTION);
hljs.registerLanguage('ssb-target-section', SSBHlJS_TARGET_SECTION);
hljs.registerLanguage('ssb-events-section', SSBHlJS_EVENTS_SECTION);
hljs.registerLanguage('ssb-macros-section', SSBHlJS_MACROS_SECTION);
hljs.registerLanguage('ssb-resources-section', SSBHlJS_RESOURCES_SECTION);
hljs.registerLanguage('ssb-event', SSBHlJS_EVENT);
hljs.initHighlightingOnLoad();
