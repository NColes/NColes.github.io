        function naturalCompare(a, b) {
            ax = [],
                bx = [];
            a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) {
                ax.push([$1 || Infinity, $2 || ""])
            });
            b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) {
                bx.push([$1 || Infinity, $2 || ""])
            });
            while (ax.length && bx.length) {
                an = ax.shift();
                bn = bx.shift();
                nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
                if (nn) return nn;
            }
            return ax.length - bx.length;
        }