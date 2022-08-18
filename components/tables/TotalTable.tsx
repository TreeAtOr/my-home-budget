import { Table, Text } from "@nextui-org/react"
import useTranslation from "next-translate/useTranslation";
import { ITotalTableRecord } from "../../types/ITotalTableRecord";


function renderPercentage(val: number) {
    if (val === null || val === undefined) return (<Text size={16} b color='red'>∞% ↑</Text>);
    else if (val === 0) return (<Text size={16} b color='orange'>0%</Text>);
    else if (val > 0) return (<Text size={16} b color='red'>{val}% ↑</Text>); else return (<Text size={14} b color='green'>{val}% ↓</Text>);
}
interface ITotalTableProps {
    data: ITotalTableRecord[],
    rowsPerPage: number
}
export function TotalTable({ data, rowsPerPage }: ITotalTableProps) {
    const { t } = useTranslation('common')

    return (<Table
        aria-label="Total table"
        css={{
            height: "auto",
            minWidth: "100%",
        }}
    >
        <Table.Header>
            <Table.Column>{t('TableKind')}</Table.Column>
            <Table.Column>{t('TablePlan')}</Table.Column>
            <Table.Column>{t('TableFact')}</Table.Column>
            <Table.Column>{t('TableChange')}</Table.Column>
        </Table.Header>
        <Table.Body items={data}>
            {(item) => (
                <Table.Row key={item.total_kind}>
                    <Table.Cell>{item.total_kind}</Table.Cell>
                    <Table.Cell>{item.total_plan}</Table.Cell>
                    <Table.Cell>{item.total_fact}</Table.Cell>
                    <Table.Cell>{renderPercentage(item.total_percentage)}</Table.Cell>
                </Table.Row>
            )}
        </Table.Body>
        <Table.Pagination
            shadow
            noMargin
            align="center"
            rowsPerPage={rowsPerPage}
            onPageChange={(page: number) => console.log({ page })}
        />
    </Table>)
}