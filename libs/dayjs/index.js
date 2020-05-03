import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('ja');
dayjs.extend(relativeTime)

export default dayjs;
