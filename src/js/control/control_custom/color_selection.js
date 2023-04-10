import control from '../../control'

const colorObj = {
  'Warm': ['#FFD600', '#FFDD00', '#FFB600', '#FF9E18', '#F18A00', '#FF6B00', '#FF6C0E', '#FF4D00', '#E1251B', '#E7004C', '#D50037', '#E50695'],
  'Cold': ['#BA5B80', '#93358D', '#8331A7', '#60269E', '#79A3DC', '#2A7DE1', '#0071CE', '#00C1DE', '#00A5B5', '#00A19B', '#009383', '#00586F'],
  'Earth': ['#00BBB4', '#18988B', '#009579', '#00945E', '#009845', '#45A041', '#789C4A', '#999A32', '#B99C16', '#B97727', '#9F662D', '#88431D'],
  'Pale/Grey': ['#FCD199', '#D1CCBD', '#BBC6C3', '#AFA99F', '#CBC3BB', '#B3B795', '#E6D67F', '#BADF93', '#74E0C1', '#AFE2E3', '#B4B3DF', '#ECD2E1'],
}

export default class controlColorSelection extends control {
  static get definition() {
    return {
      icon: '🌟',
      i18n: {
        default: 'Color Selection',
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

    const selectedColor = this._selectedColor()
    const hr = this.markup('hr', null, {})
    const colors = this._colors()
    const colorSelection = this.markup('div', [selectedColor, hr, colors], { className: 'color_selection' })

    return this.markup('div', [subtitle, colorSelection], { id: this.config.name })
  }

  onRender() {
    const name = this.config.name

    $('#favorite-color-picker').change(function (e) {
      $('#selected_color_main').css('background-color', e.target.value)
      $(`input[name=${name}]:checked`).value = e.target.value
    })
    $('.btn-color-select').click(function () {
      var color = this.getAttribute('for')

      $('#selected_color_main').css('backgroundColor', color)
      $('#favorite-color-picker').val(color)
    })
  }

  _selectedColor() {
    const input = this.markup('input', '0000', { type: 'color', id: 'favorite-color-picker', className: 'favorite-color-picker' })
    const showColorPicker = this.markup('span', input, { id: 'show-color-picker', className: 'show-color-picker' })
    const selectedColorMain = this.markup('span', showColorPicker, { id: 'selected_color_main', className: 'dot mx-3 selected_color_main' })

    return this.markup('div', selectedColorMain, { className: 'selected_color text-center' })
  }

  _colors() {
    const colorType = []

    const obj = this.config.colorInput || colorObj

    for (const [key, value] of Object.entries(obj)) {
      colorType.push(this.markup('div', `<span>${key}</span>`, { className: 'text-center' })) 
      
      const color = value.map(o => {
        const input = this.markup('input', null, { type: 'radio', id: o, name: this.config.name, value: o, autocomplete: 'off' })
        const btn = this.markup('div', '0000', { type: 'button', class: 'btn', style: `background-color: ${o};` })
        const btnGroup = this.markup('div', btn, { className: 'btn-group btn-group-lg', role: 'group', ariaLabel: 'Large Button Group' })
        return this.markup('label', [input, btnGroup], { className: 'btn btn-outline-secondary btn-color-select color mx-2 my-1', for: o })
      })
      const col = this.markup('div', color, { className: 'col-md-12 text-center' })
      const row = this.markup('div', col, { className: 'row mt-3 mb-5' })

      colorType.push(row)
    }

    return this.markup('div', colorType, { className: 'colors', dataToggle: 'buttons' })
  }
}

control.register('color_selection', controlColorSelection)