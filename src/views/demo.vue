<template>
    <div>
        <el-color-picker color-format="hex" v-model="colors.success" @change="handleColorChange"></el-color-picker>
        <el-button type="primary">测试按钮</el-button>
        <el-button type="success">测试按钮</el-button>
    </div>
</template>
<script>
import generateColors from 'utils/color'
export default {
    data() {
        return {
            colors: {
                primary: '#409eff',
                success: '#67C23A',
                warning: '#E6A23C',
                danger: '#F56C6C',
            },
            originalStyle: '',
            originalStylesheetCount: -1,
        }
    },
    created() {
        this.getIndexStyle();
    },
    mounted() {
        this.$nextTick(() => {
            this.originalStylesheetCount = document.styleSheets.length
        })
    },
    methods: {
        getFile(url, isBlob = false) {
            return new Promise((resolve, reject) => {
                const client = new XMLHttpRequest()
                client.responseType = isBlob ? 'blob' : ''
                client.onreadystatechange = () => {
                    if (client.readyState !== 4) {
                        return
                    }
                    if (client.status === 200) {
                        const urlArr = client.responseURL.split('/')
                        resolve({
                            data: client.response,
                            url: urlArr[urlArr.length - 1]
                        })
                    } else {
                        reject(new Error(client.statusText))
                    }
                }
                client.open('GET', url)
                client.send()
            })
        },
        getStyleTemplate(data) {
            const colorMap = {
                '#3a8ee6': 'shade-1',
                '#409eff': 'primary',
                '#67C23A': 'success',
                '#E6A23C': 'warning',
                '#F56C6C': 'danger',
                '#53a8ff': 'light-1',
                '#66b1ff': 'light-2',
                '#79bbff': 'light-3',
                '#8cc5ff': 'light-4',
                '#a0cfff': 'light-5',
                '#b3d8ff': 'light-6',
                '#c6e2ff': 'light-7',
                '#d9ecff': 'light-8',
                '#ecf5ff': 'light-9'
            }
            Object.keys(colorMap).forEach(key => {
                const value = colorMap[key]
                data = data.replace(new RegExp(key, 'ig'), value)
            })
            return data
        },
        getIndexStyle() {
            this.getFile('//unpkg.com/element-ui/lib/theme-chalk/index.css')
                .then(({ data }) => {
                    this.originalStyle = this.getStyleTemplate(data);
                })
        },
        writeNewStyle() {
            let cssText = this.originalStyle
            Object.keys(this.colors).forEach(key => {
                cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.colors[key])
            })

            if (this.originalStylesheetCount === document.styleSheets.length) {
                const style = document.createElement('style')
                style.innerText = cssText
                document.head.appendChild(style)
            } else {
                document.head.lastChild.innerText = cssText
            }
        },
        handleColorChange(e) {
            this.colors.success = e;
            this.colors = Object.assign({}, this.colors, generateColors(this.colors.primary))
            console.log(this.colors)
            this.writeNewStyle()
        }
    }
}
</script>