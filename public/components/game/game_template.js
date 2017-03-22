function pug_rethrow(n, e, r, t) {
	if (!(n instanceof Error)) throw n; if (!(typeof window === "undefined" && e || t)) throw n.message += ` on line ${r}`, n; try { t = t || require("fs").readFileSync(e, "utf8"); } catch (e) { pug_rethrow(n, null, r); } var i = 3,
		a = t.split("\n"),
		o = Math.max(r - i, 0),
		h = Math.min(a.length, r + i),
		i = a.slice(o, h).map((n, e) => { const t = e + o + 1; return `${(t == r ? "  > " : "    ") + t}| ${n}`; }).join("\n"); throw n.path = e, n.message = `${e || "Pug"}:${r}\n${i}\n\n${n.message}`, n;
} function game_template(locals) {
	let pug_html = "",
		pug_mixins = {},
		pug_interp; let pug_debug_filename,
			pug_debug_line; try {
				var pug_debug_sources = { "public\u002Fblocks\u002Fgame\u002Fgame_template.pug": ".game-container" };
				pug_debug_line = 1; pug_debug_filename = "public\u002Fblocks\u002Fgame\u002Fgame_template.pug";
				pug_html = `${pug_html}\u003Cdiv class="game-container"\u003E\u003C\u002Fdiv\u003E`;
			} catch (err) { pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]); } return pug_html;
}
