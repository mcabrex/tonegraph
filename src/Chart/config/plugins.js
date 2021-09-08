const plugins = {
    legend: {
        align: 'start',
        position: 'bottom'
    },
    tooltip: {
        callbacks: {
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