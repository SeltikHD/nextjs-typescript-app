import type { LayoutProps } from '@components/UI/Layout';
import { createContext } from 'react';

const LayoutContext = createContext<{ setProps: (props: LayoutProps) => void }>({
    setProps: () => {
        return;
    },
});

export default LayoutContext;
