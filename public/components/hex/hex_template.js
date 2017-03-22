function pug_escape(e) {
	let a = `${e}`,
		t = pug_match_html.exec(a); if (!t) return e; let r,
			c,
			n,
			s = ""; for (r = t.index, c = 0; r < a.length; r++) { switch (a.charCodeAt(r)) { case 34:n = "&quot;"; break; case 38:n = "&amp;"; break; case 60:n = "&lt;"; break; case 62:n = "&gt;"; break; default:continue; }c !== r && (s += a.substring(c, r)), c = r + 1, s += n; } return c !== r ? s + a.substring(c, r) : s;
}
var pug_match_html = /["&<>]/;
function pug_rethrow(n, e, r, t) {
	if (!(n instanceof Error)) throw n; if (!(typeof window === "undefined" && e || t)) throw n.message += ` on line ${r}`, n; try { t = t || require("fs").readFileSync(e, "utf8"); } catch (e) { pug_rethrow(n, null, r); } var i = 3,
		a = t.split("\n"),
		o = Math.max(r - i, 0),
		h = Math.min(a.length, r + i),
		i = a.slice(o, h).map((n, e) => { const t = e + o + 1; return `${(t == r ? "  > " : "    ") + t}| ${n}`; }).join("\n"); throw n.path = e, n.message = `${e || "Pug"}:${r}\n${i}\n\n${n.message}`, n;
} function hex_template(locals) {
	let pug_html = "",
		pug_mixins = {},
		pug_interp; let pug_debug_filename,
			pug_debug_line; try {
				var pug_debug_sources = { "public\u002Fblocks\u002Fhex\u002Fhex_template.pug": ".hex\n    .hex__minor_hex\n        .hex__title #{hex_title}\n        .hex__motto #{hex_phrase}\n        .hex__buttons\n            .hex__buttons-main\n            .hex__buttons-minor" };
				const locals_for_with = (locals || {}); (function (hex_phrase, hex_title) {
					pug_debug_line = 1; pug_debug_filename = "public\u002Fblocks\u002Fhex\u002Fhex_template.pug";
					pug_html = `${pug_html}\u003Cdiv class="hex"\u003E`;
					pug_debug_line = 2; pug_debug_filename = "public\u002Fblocks\u002Fhex\u002Fhex_template.pug";
					pug_html = `${pug_html}\u003Cdiv class="hex__minor_hex"\u003E`;
					pug_debug_line = 3; pug_debug_filename = "public\u002Fblocks\u002Fhex\u002Fhex_template.pug";
					pug_html = `${pug_html}\u003Cdiv class="hex__title"\u003E`;
					pug_debug_line = 3; pug_debug_filename = "public\u002Fblocks\u002Fhex\u002Fhex_template.pug";
					pug_html = `${pug_html + (pug_escape((pug_interp = hex_title) == null ? "" : pug_interp))}\u003C\u002Fdiv\u003E`;
					pug_debug_line = 4; pug_debug_filename = "public\u002Fblocks\u002Fhex\u002Fhex_template.pug";
					pug_html = `${pug_html}\u003Cdiv class="hex__motto"\u003E`;
					pug_debug_line = 4; pug_debug_filename = "public\u002Fblocks\u002Fhex\u002Fhex_template.pug";
					pug_html = `${pug_html + (pug_escape((pug_interp = hex_phrase) == null ? "" : pug_interp))}\u003C\u002Fdiv\u003E`;
					pug_debug_line = 5; pug_debug_filename = "public\u002Fblocks\u002Fhex\u002Fhex_template.pug";
					pug_html = `${pug_html}\u003Cdiv class="hex__buttons"\u003E`;
					pug_debug_line = 6; pug_debug_filename = "public\u002Fblocks\u002Fhex\u002Fhex_template.pug";
					pug_html = `${pug_html}\u003Cdiv class="hex__buttons-main"\u003E\u003C\u002Fdiv\u003E`;
					pug_debug_line = 7; pug_debug_filename = "public\u002Fblocks\u002Fhex\u002Fhex_template.pug";
					pug_html = `${pug_html}\u003Cdiv class="hex__buttons-minor"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E`;
				}.call(this, "hex_phrase" in locals_for_with ? locals_for_with.hex_phrase : typeof hex_phrase !== "undefined" ? hex_phrase : undefined, "hex_title" in locals_for_with ? locals_for_with.hex_title : typeof hex_title !== "undefined" ? hex_title : undefined));
			} catch (err) { pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]); } return pug_html;
}
