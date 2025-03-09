import { apiConfig } from "../getAPI/apiConfig";
import './tableTitle.css'


export function TableTitle({ API, VAR }) {
    const config = apiConfig[API].config[VAR];

    return (
        <thead className="title">
            <tr>
                {config.order
                    .filter((key) => config[key]?.type !== null)
                    .flatMap((key) => {
                        if (key === "extra" && config.extra) {
                            return Object.keys(config.extra)
                                .filter((extraKey) => config.extra[extraKey]?.type !== null)
                                .map((extraKey) => (
                                    <th key={`extra-${extraKey}`}>
                                        {config.extra[extraKey]?.name || `Extra ${extraKey}`}
                                    </th>
                                ));
                        }
                        return (
                            <th key={key}>
                                {config[key]?.name || key}
                            </th>
                        );
                    })}
            </tr>
        </thead>
    );
}