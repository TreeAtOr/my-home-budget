import { faEdit, faFileEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Row, Spacer, Table, Text } from "@nextui-org/react"
import { Translate } from "next-translate"
import useTranslation from "next-translate/useTranslation"
import { useMemo } from "react"
import { ITableRecord } from "../../types/ITableRecord"
import useAdaptivity from "../../utils/hooks/useAdaptivity"
import { Sizes, WithId } from "../../utils/types"

const renderHeader = (size: Sizes, t: Translate) => {
    if (size == 'xs') return [
        <Table.Column key={1}>{t('TableLabel')}</Table.Column>,
        <Table.Column key={2}>{t('TableAmount')}</Table.Column>,
        <Table.Column key={4}>{t('TableKind')}</Table.Column>,
        <Table.Column key={5}>{t('')}</Table.Column>,
    ]

    return [
        <Table.Column key={1}>{t('TableLabel')}</Table.Column>,
        <Table.Column key={2}>{t('TableAmount')}</Table.Column>,
        <Table.Column key={3}>{t('TableDate')}</Table.Column>,
        <Table.Column key={4}>{t('TableKind')}</Table.Column>,
        <Table.Column key={5}>{t('TableEdit')}</Table.Column>,
    ]
}

const renderCellsFactory = (
    size: Sizes,
    onEdit: (item: WithId<ITableRecord>) => void,
    onDelete: (id: number) => void) => {
    if (size == 'xs') return (item: WithId<ITableRecord>) => [
        <Table.Cell key={item.id + 'h'}>
            {(item.label.length > 10) ? item.label.slice(0, 10) + '...' : item.label}
        </Table.Cell>,
        <Table.Cell key={item.id + 'a'}>{item.amount >= 1000 ? item.amount / 1000 + 'k' : item.amount}</Table.Cell>,
        <Table.Cell key={item.id + 'k'}>{(item.kind.length > 10) ? item.kind.slice(0, 10) + '...' : item.kind}</Table.Cell>,
        <Table.Cell key={item.id + 'T'}>
            <Row>
                <FontAwesomeIcon onClick={() => onEdit(item)} cursor="select" color="gray" icon={faEdit} />
                <Spacer x={0.2} />
                <FontAwesomeIcon onClick={() => onDelete(item.id)} cursor="select" color="gray" icon={faTrash} />
            </Row>
        </Table.Cell>
    ]

    return (item: WithId<ITableRecord>) => [
        <Table.Cell key={item.id + 'h'}>{item.label}</Table.Cell>,
        <Table.Cell key={item.id + 'a'}>{item.amount}</Table.Cell>,
        <Table.Cell key={item.id + 'd'}>{new Date(item.date).toLocaleDateString()}</Table.Cell>,
        <Table.Cell key={item.id + 'k'}>{item.kind}</Table.Cell>,
        <Table.Cell key={item.id + 'T'}>
            <Row>
                <FontAwesomeIcon onClick={() => onEdit(item)} cursor="select" color="gray" icon={faEdit} />
                <Spacer x={0.2} />
                <FontAwesomeIcon onClick={() => onDelete(item.id)} cursor="select" color="gray" icon={faTrash} />
            </Row>
        </Table.Cell>

    ]
}

export function SpendingTable({ data, rowsPerPage, onEdit, onDelete }) {
    const { t } = useTranslation('common')
    const size = useAdaptivity()

    const header = useMemo(() => renderHeader(size, t), [size, t])
    const renderCells = useMemo(() => renderCellsFactory(size, onEdit, onDelete), [size])
    return (<Table
        css={{
            height: "auto",
            minWidth: "100%",
        }}
    >
        <Table.Header>
            {header}
        </Table.Header>

        <Table.Body items={data}>
            {(item: WithId<ITableRecord>) => (
                <Table.Row key={item.id}>
                    {renderCells(item)}
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