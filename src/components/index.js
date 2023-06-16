import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'


export const componentPlugin={
    install(app){
            app.component('XtuImageView',ImageView)
            app.component('XtuSku',Sku)
    }
} 