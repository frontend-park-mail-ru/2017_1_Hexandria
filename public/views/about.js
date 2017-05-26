import View from './view';
import Title from '../components/title/title';

export default class AboutView extends View {
    constructor(options = {}) {
        super(options);

        const pageAbout = document.getElementById('about');

        const title = new Title({
            text: 'About',
            backButton: true,
        });
        pageAbout.appendChild(title.el);

        this._el = pageAbout;
        this.hide();
    }
}
