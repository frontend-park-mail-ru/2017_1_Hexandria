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
} function user_panel_template(locals) {
	let pug_html = "",
		pug_mixins = {},
		pug_interp; let pug_debug_filename,
			pug_debug_line; try {
				var pug_debug_sources = { "public\u002Fblocks\u002Fuser_panel\u002Fuser_panel_template.pug": ".user_panel__username #{username}\nimg(class='user_panel__avatar' src=\"img\u002Four_typical_user.jpeg\")" };
				const locals_for_with = (locals || {}); (function (username) {
					pug_debug_line = 1; pug_debug_filename = "public\u002Fblocks\u002Fuser_panel\u002Fuser_panel_template.pug";
					pug_html = `${pug_html}\u003Cdiv class="user_panel__username"\u003E`;
					pug_debug_line = 1; pug_debug_filename = "public\u002Fblocks\u002Fuser_panel\u002Fuser_panel_template.pug";
					pug_html = `${pug_html + (pug_escape((pug_interp = username) == null ? "" : pug_interp))}\u003C\u002Fdiv\u003E`;
					pug_debug_line = 2; pug_debug_filename = "public\u002Fblocks\u002Fuser_panel\u002Fuser_panel_template.pug";
					pug_html = `${pug_html}\u003Cimg class="user_panel__avatar" src="img\u002Four_typical_user.jpeg"\u002F\u003E`;
				}.call(this, "username" in locals_for_with ? locals_for_with.username : typeof username !== "undefined" ? username : undefined));
			} catch (err) { pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]); } return pug_html;
}
