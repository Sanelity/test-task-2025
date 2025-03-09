import { apiConfig } from "../getAPI/apiConfig";

import './tableItem.css'

export function TableItem({ data, API, VAR }) {
  const config = apiConfig[API].config[VAR];
  const imageStyle = { maxHeight: "8vh" };

  const renderContent = (key, value, fieldConfig) => {
    if (!fieldConfig || fieldConfig.type === null) return null;

    let content = value ?? "-";

    if (fieldConfig.type === "image" && value) {
      content = <img src={value} alt="Image" style={imageStyle} />;
    }

    if (fieldConfig.type === "link" && value) {
      content = (
        <a href={value} target="_blank" rel="noopener noreferrer">
          {fieldConfig.name || "Link"}
        </a>
      );
    }

    // Обработка текстового поля (description)
    if (fieldConfig.type === "text" && value && typeof value === 'string') {
      content = (
        <div className="description-collapsed">
          {value}
        </div>
      );
    }

    return content;
  };

  return (
    <tr>
      {config.order.map((key) => {
        const fieldConfig = config[key];
        if (!fieldConfig || fieldConfig.type === null) return null;

        if (key === "extra" && config.extra) {
          return Object.keys(config.extra).map((extraKey) => {
            const extraField = config.extra[extraKey];
            if (!extraField || extraField.type === null) return null;

            const extraValue = data.extra?.[extraKey];
            const extraContent = renderContent(`extra.${extraKey}`, extraValue, extraField);

            return <td key={`extra-${extraKey}`}>{extraContent}</td>;
          });
        }

        const value = data[key];
        const content = renderContent(key, value, fieldConfig);

        return <td key={key}>{content}</td>;
      })}
    </tr>
  );
}