import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const useD3 = function(renderChartFn: any, dependencies: [any]){
    const ref = useRef('');

    useEffect(() => {
        renderChartFn(d3.select(ref.current));
        return () => {};
      }, dependencies);
    return ref;
}

export default useD3;