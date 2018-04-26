/**
 * @file   mofron-comp-confirmdlg/index.js
 * @author simpart
 */
let mf = require('mofron');
let Text = require('mofron-comp-text');
let MsgDlg = require('mofron-comp-msgdlg');
let efCenter = require('mofron-effect-center');

/**
 * @class mofron.comp.FormDlg
 * @brief confirm dialog component for mofron
 */
mf.comp.Confirm = class extends MsgDlg {
    
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('Confirm');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @param prm : 
     */
    initDomConts (prm) {
        try {
            super.initDomConts(prm);
            super.button()[0].text('Yes');
            this.addButton('No');
            
            /* init callback */
            this.buttonEvent(
                (cidx, dlg) => {
                    try {
                        let set_ret = null;
                        if (0 == cidx) {
                            set_ret = true;
                        } else if (1 == cidx) {
                            set_ret = false;
                        } else {
                            set_ret = cidx;
                        }
                        
                        let cb = dlg.callback();
                        if (null !== cb) {
                            cb[0](set_ret, dlg, cb[1]);
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    button (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return super.button();
            }
            /* setter */
            if (true !== Array.isArray(prm)) {
                throw new Error('invalid paramter');
            }
            /* update button text */
            (undefined !== prm[0])? super.button()[0].text(prm[0]) : undefined;
            (undefined !== prm[1])? super.button()[1].text(prm[1]) : undefined;
            /* add button */
            for (let idx=2; idx < prm.length ;idx++) {
                this.addButton(prm[idx]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    callback (fnc, prm) {
        try {
            if ((undefined === fnc) && (undefined === prm)) {
                /* getter */
                return (undefined === this.m_callback) ? null : this.m_callback;
            }
            /* setter */
            if ((undefined !== fnc) && ('function' !== typeof fnc)) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_callback) {
                this.m_callback = new Array(()=>{}, null);
            }
            if (undefined !== fnc) {
                this.m_callback[0] = fnc;
            }
            if (undefined !== prm) {
                this.m_callback[1] = prm;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.Confirm;
/* end of file */
