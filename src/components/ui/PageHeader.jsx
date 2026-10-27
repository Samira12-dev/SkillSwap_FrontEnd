import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PageHeader({
    title,
    description,
    eyebrow,
    actions,
    breadcrumbs = [],
    className = ""
}) {
    return (
        <header className={`ui-page-header ${className}`.trim()}>
            <div className="ui-page-header-copy">
                {breadcrumbs.length > 0 && (
                    <nav className="ui-breadcrumbs" aria-label="Breadcrumb">
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;

                            return (
                                <span key={`${item.label}-${index}`} className="ui-breadcrumb">
                                    {item.to && !isLast ? (
                                        <Link to={item.to}>{item.label}</Link>
                                    ) : (
                                        <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
                                    )}
                                    {!isLast && <ChevronRight size={13} aria-hidden="true" />}
                                </span>
                            );
                        })}
                    </nav>
                )}
                {eyebrow && <p className="ui-eyebrow">{eyebrow}</p>}
                <h1>{title}</h1>
                {description && <p className="ui-page-description">{description}</p>}
            </div>
            {actions && <div className="ui-page-actions">{actions}</div>}
        </header>
    );
}
