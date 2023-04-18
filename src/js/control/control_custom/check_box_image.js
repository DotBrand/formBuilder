import control from '../../control'

export default class controlCheckboxImage extends control {
    static get definition() {
        return {
            icon: '<i class="icon icon-image-selection"></i>',
            i18n: {
                default: 'IMAGES SELECTION',
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

        const styleSelection = this._styleSelection()
        const imgCheckbox = this._imgCheckbox()
        const checkboxImage = this.markup('div', [styleSelection, imgCheckbox], { className: 'checkbox_image' })

        let other = ''
        if (this.config.hasOther) {
        const input = this.markup('input', null, {type: 'text', className: 'form-control'})
        const label = this.markup('div', this.config.otherInput, {})
        other = this.markup('div', [label, input], {className: 'mt-3 w-100'})
        } 

        return this.markup('div', [subtitle, checkboxImage, other], { id: this.config.name })
    }

    onRender() {
        const name = this.config.name
        const limit = this.config.limit || 30

        $(`.filter_input-${name}`).click(function () {
            $(`.icon_options-${name}`).addClass('d-none')
            $('.' + this.id).removeClass('d-none')
        })

        $(`input[name=${name}]`).change(function () {
            var max = limit
            if ($(`input[name=${name}]:checked`).length == max) {
                $(`input[name=${name}]`).attr('disabled', 'disabled')
                $(`input[name=${name}]:checked`).removeAttr('disabled')
            } else {
                $(`input[name=${name}]`).removeAttr('disabled')
            }
        })
    }

    _styleSelection() {
        const allInput = this.markup('input', null, { className: `filter_input-${this.config.name}`, type: 'radio', name: `style-${this.config.name}`, id: `AllStyles-${this.config.name}`,  autocomplete: 'off', value: 'All Styles'  })
        const allBtn = this.markup('div', '<span class="btn_name">All Styles</span>', { className: 'btn_label' })
        const all = this.markup('label', [allInput, allBtn], { className: 'btn btn_style btn-outline-secondary active' })

        const others = []
        if (!this.config.imageOptions) this.config.imageOptions = []

        this.config.imageOptions.map(o => {
            const input = this.markup('input', null, { className: `filter_input-${this.config.name}`, type: 'radio', name: `style-${this.config.name}`, id: `${o.label}-${this.config.name}`,  autocomplete: 'off', value: o.label })
            const btn = this.markup('div', `<span class="btn_name">${o.label}</span>`, { className: 'btn_label' })
            const other = this.markup('label', [input, btn], { className: 'btn btn_style btn-outline-secondary' })
            others.push(other)
        })

        const wrap = this.markup('div', [all, ...others], { className: 'style_selection gap-1', dataToggle: 'buttons' })
        return this.markup('div', wrap, { className: 'col-md-12 my-3 px-0' })
    }

    _imgCheckbox() {
        if (!this.config.imageOptions) this.config.imageOptions = []
        const imgs = this.config.imageOptions.map(imgOpt => {
          return imgOpt.options.map(o => {
            const date = Date.now()
            const img = this.markup('img', null, { src: '', width: '200', id: date })

            // if(o.file) {
            //     const reader = new FileReader()
            //     reader.onload = () => {
            //         console.log(reader)
            //     }
            //     reader.readAsDataURL(o.file)
            // }
            
            const checkbox = this.markup('input', null, { className: 'check', type: 'checkbox', autocomplete: 'off', name: this.config.name })
            const btn = this.markup('div', `<span class="btn_name">${img.outerHTML}</span>`, { className: 'btn_label' })
            return this.markup('label', [checkbox, btn], { style: 'display: none', className: `btn btn_img btn-outline-secondary icon_options-${this.config.name} ${imgOpt.label}-${this.config.name} AllStyles-${this.config.name}` })
          })
        })

        return this.markup('div', imgs, { className: 'img_checkbox gap-5', dataToggle: 'buttons' })
    }
}

control.register('check_box_image', controlCheckboxImage)