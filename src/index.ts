declare const hljs;
import { SSBHlJS } from "./ssb.highlight";

hljs.registerLanguage('ssb', SSBHlJS);
hljs.initHighlightingOnLoad();
