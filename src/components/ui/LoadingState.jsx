export function LoadingState({ label = "Loading…", className = "" }) {
    return (
        <div className={`ui-loading ${className}`.trim()} role="status">
            <span className="ui-spinner" aria-hidden="true" />
            <span>{label}</span>
        </div>
    );
}

export function Skeleton({ width, height, className = "", style }) {
    return (
        <span
            className={`ui-skeleton ${className}`.trim()}
            style={{ width, height, ...style }}
            aria-hidden="true"
        />
    );
}

export function SkeletonCard({ rows = 3, className = "" }) {
    return (
        <div className={`ui-skeleton-card ${className}`.trim()} aria-hidden="true">
            <div className="ui-skeleton-row">
                <Skeleton width="42px" height="42px" className="ui-skeleton-circle" />
                <div className="ui-skeleton-stack">
                    <Skeleton width="55%" height="12px" />
                    <Skeleton width="35%" height="10px" />
                </div>
            </div>
            {Array.from({ length: rows }).map((_, index) => (
                <Skeleton key={index} width={index === rows - 1 ? "70%" : "100%"} height="10px" />
            ))}
        </div>
    );
}
