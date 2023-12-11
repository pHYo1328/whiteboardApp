
import {
    TLAnyShapeUtilConstructor,
    defaultShapeUtils,
    createTLStore,
    TLStoreWithStatus,

} from '@tldraw/tldraw'
import { useEffect, useMemo, useState } from 'react'
export default function useLiveBlockStore({ shapeUtils= [] }: { shapeUtils: TLAnyShapeUtilConstructor[] }) {
    const [store] = useState(() => {
        const store = createTLStore({
            shapeUtils: [...defaultShapeUtils, ...shapeUtils],
        })
        return store
    })
    const [storeWithStatus, setStoreWithStatus] = useState<TLStoreWithStatus>({
        status: 'loading',
    })

}