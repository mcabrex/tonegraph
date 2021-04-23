const plugins = {
    tooltip: {
        callbacks: {
            title: function(context){
                console.log('context',context)
                // return context[0].parsed.x
            },
            label: function(context) {
                var label = context.dataset.label || '';

                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += context.parsed.y + 'Hz';
                }
                return label;
            }
        }
    }
}

export default plugins