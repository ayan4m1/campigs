import { createRoot } from 'react-dom/client';

import './index.scss';
import IndexPage from 'pages';

const root = createRoot(document.getElementById('root'));

root.render(<IndexPage />);
