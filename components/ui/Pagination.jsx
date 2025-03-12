import ArrowLeft from '@icons/ArrowLeft';
import ArrowRight from '@icons/ArrowRight';
import classNames from 'classnames';
import Link from 'next/link';

const Pagination = ({ className, ...props }) => {
    const { page, total, perPage } = props;

    const maxPage = Math.ceil(total / perPage);

    const visibleElements = (pageNumber) => {
        if (pageNumber < 4) return 5 - pageNumber;
        if (maxPage - pageNumber < 3) return 4 - (maxPage - pageNumber);
        return 1;
    };

    const changePage = (value) => {
        const newPage = Number(page) + value;
        if (newPage > maxPage) return maxPage;
        if (newPage < 1) return 1;
        return newPage;
    };

    const generatePageNumbers = () => {
        const pages = [1];
        const pageNumber = Number(page);

        if (maxPage <= 7) {
            for (let i = 2; i <= maxPage; i++) pages.push(i);
        } else {
            if (pageNumber > 3) pages.push('...');
            for (
                let i = Math.max(2, pageNumber - visibleElements(pageNumber));
                i <= Math.min(maxPage, pageNumber + visibleElements(pageNumber));
                i++
            ) {
                pages.push(i);
            }
            if (pageNumber < maxPage - 2) {
                pages.push('...', maxPage);
            }
        }
        return pages;
    };

    return (
        <div className={classNames('pagination', className)}>
            <Link
                href={{
                    pathname: '/history',
                    query: { page: changePage(-1) },
                }}
            >
                <button className="arrow arrow-left">
                    <ArrowLeft className="icon" />
                </button>
            </Link>
            {generatePageNumbers().map((p, index) => (
                <Link
                    href={{
                        pathname: '/history',
                        query: { page: p },
                    }}
                    key={index}
                >
                    <button className={classNames('page', Number(page) === p ? 'active' : null)}>
                        {p}
                    </button>
                </Link>
            ))}
            <Link
                href={{
                    pathname: '/history',
                    query: { page: changePage(1) },
                }}
            >
                <button className="arrow arrow-right">
                    <ArrowRight className="icon" />
                </button>
            </Link>
        </div>
    );
};

export { Pagination };
