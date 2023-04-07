import control from '../../control'

export default class controlUpload extends control {
  static get definition() {
    return {
      icon: '🌟',
      i18n: {
        default: 'Upload',
      },
    }
  }
  
  configure() { }

  build() {
    const text = this.config.subtitle ? '- ' + this.config.subtitle : ''
    const subtitle = this.markup('label', text, {className: 'd-block text-left text-muted'}) 

    if (this.config.html && this.config.html.trim() != '' && !this.config.isDefaultTemplate) {
      const customHTML = this.markup('div', `<div>${this.config.html}</div>`, {id: this.config.name})
      return this.markup('div', [subtitle, customHTML], {id: this.config.name})
    }

    const preview = this.markup('div', `<img id="${this.config.name}-img-preview" src="https://via.placeholder.com/120?text=+" style="max-width: 120px;" />`, {className: 'mb-1'})
    const input = this.markup('input', null, {type: 'file', style: 'display: none;', id: this.config.name + '-upload'})
    const label = this.markup('label', [input, 'UPLOAD'], {className: 'my-3 px-5 py-3 btn btn_radio btn-outline-secondary', style: 'border-radius:1.25em;font-size: larger;font-weight:600;'})

    let other = ''
    if (this.config.hasOther) {
      const input = this.markup('input', null, {type: 'text', className: 'form-control'})
      const label = this.markup('div', this.config.otherInput, {})
      other = this.markup('div', [label, input], {className: 'mt-3'})
    } 

    return this.markup('div', [subtitle, preview, label, other], {id: this.config.name})
  }

  onRender() {
    $(`#${this.config.name}-upload`).change(() => {
      const file = $(`#${this.config.name}-upload`).get(0).files[0]

      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          $(`#${this.config.name}-img-preview`).attr('src', reader.result)
        }
        reader.readAsDataURL(file)
      }
    })
  }
}

control.register('upload', controlUpload)