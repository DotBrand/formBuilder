import control from '../../control'

export default class controlRadioSelection extends control {
    static get definition() {
        return {
            icon: '🌟',
            i18n: {
                default: 'Radio Selection',
            },
        }
    }

    configure() { }

    build() {
        const text = this.config.subtitle ? '- ' + this.config.subtitle : ''
        const subtitle = this.markup('label', text, { className: 'd-block text-left text-muted' })

        if (this.config.html && this.config.html.trim() != '' && !this.config.isDefaultTemplate) {
            const customHTML = this.markup('div', `<div>${this.config.html}</div>`, { id: this.config.name })
            return this.markup('div', [subtitle, customHTML], { id: this.config.name })
        }

        const buttons = []
        for (let i = 0; this.config.values && i < this.config.values.length; i++) {
            const option = this.config.values[i]
            const config = { type: 'radio', id: `${this.config.name}-${option.value}`, name: `${this.config.name}` }
            const checked = option.selected ? { ...config, checked: 'checked' } : { ...config }
            const active = option.selected ? 'active' : ''
            const radio = this.markup('input', null, checked)
            const label = this.markup('div', `<span class="btn_name" style="font-weight: 400;">${option.label}</span>`, { className: 'btn_label' })
            const button = this.markup('label', [radio, label], { className: `px-5 btn btn_radio btn-outline-secondary jsc_keyword_box keyword_box ${active}`, style: 'border-radius:0.75em;' })
            buttons.push(button)
        }

        const selections = this.markup('div', buttons, { className: 'w-100 d-flex gap-2 flex-wrap' })

        let other = ''
        if (this.config.hasOther) {
            const input = this.markup('input', null, { type: 'text', className: 'form-control' })
            const label = this.markup('div', this.config.otherInput, {})
            other = this.markup('div', [label, input], { className: 'mt-3 w-100' })
        }

        return this.markup('div', [subtitle, selections, other], { id: this.config.name, className: 'd-flex gap-2 radio_selection flex-wrap', dataToggle: 'buttons' })
    }

    onRender() { }
}

control.register('radio_selection', controlRadioSelection)