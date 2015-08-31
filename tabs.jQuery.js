/*
 * TAB plugin
 * @param options{panelid, eventype, activeIndex, lazytime, callback}
 * @Author Jafeney
 */
jQuery.fn.extend({
    tabs:function(options,callback){
        var element = $(this),
        _panel = $('#' + options.panelid) || undefined,
        _eventype = options.eventype || 'mouseover',
        _activeIndex = options.activeIndex || 0,
        _lazytime = options.lazytime || 0,
        timer;

        element.on(_eventype,'li[data-tab]',function(){
            var tabName = $(this).attr('data-tab');
            if(_lazytime!=0){
                clearTimeout(timer);
                timer = setTimeout(function(){
                    element.trigger('change.tabs',tabName);
                },_lazytime);
            }
            else{
                element.trigger('change.tabs',tabName);
            }
        });
        element.on('mouseout','li[data-tab]',function(){
            clearTimeout(timer);
        });
        element.on('change.tabs',function(e,tabName){
            element.find('li[data-tab]').removeClass('active');
            element.find('>[data-tab=' + tabName + ']').addClass('active');
            _panel.find('>[data-tab]').removeClass('active');
            _panel.find('>[data-tab=' + tabName + ']').addClass('active');
        });
        var firstName = element.find('li:eq(' + _activeIndex + ')').attr('data-tab');
        element.trigger('change.tabs',firstName);
        this.changeTabs=function(tabName){
            element.trigger('change.tabs',tabName);
        }
        if(callback)callback();
        return this;
    }
});
