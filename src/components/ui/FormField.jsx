export default function FormField({
    label,
    htmlFor,
    required = false,
    error,
    hint,
    children,
    className = ""
}) {
    return (
        <div className={`ui-field ${error ? "has-error" : ""} ${className}`.trim()}>
            {label && (
                <label htmlFor={htmlFor}>
                    {label}
                    {required && <span className="ui-required" aria-hidden="true"> *</span>}
                </label>
            )}
            {children}
            {error ? (
                <p className="ui-field-error" role="alert">{error}</p>
            ) : (
                hint && <p className="ui-field-hint">{hint}</p>
            )}
        </div>
    );
}
