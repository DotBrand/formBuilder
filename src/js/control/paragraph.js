import control from '../control'

export default class controlParagraph extends control {
  static get definition() {
    return {
      icon: '🌟',
      i18n: {
        default: 'Paragraph',
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

    const textarea = this.markup('textarea', null, { type: 'text', className: 'form-control', placeholder: `${this.config.placeholder || ''}` })

    let other = ''
    if (this.config.hasOther) {
      const input = this.markup('input', null, { type: 'text', className: 'form-control' })
      const label = this.markup('div', this.config.otherInput, {})
      other = this.markup('div', [label, input], { className: 'mt-3' })
    }

    return this.markup('div', [subtitle, textarea, other], { id: this.config.name })
  }

  onRender() { }
}

control.register('paragraph', controlParagraph)