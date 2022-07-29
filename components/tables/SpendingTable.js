import { Button, Table, Text } from "@nextui-org/react"
import { useMemo } from "react"

const renderHeader = (size) => {
    if (size == 'xs') return [
        <Table.Column>LABEL</Table.Column>,
        <Table.Column>AMOUNT</Table.Column>,
        <Table.Column>KIND</Table.Column>,
    ]

    return [
        <Table.Column>LABEL</Table.Column>,
        <Table.Column>AMOUNT</Table.Column>,
        <Table.Column>DATE</Table.Column>,
        <Table.Column>KIND</Table.Column>,
    ]
}

const renderCellsFactory = ( size) => {
    if (size == 'xs') return (item) => [
        <Table.Cell>{(item.label.length > 16)?item.label.slice(0,16)+'...':item.label}</Table.Cell>,
        <Table.Cell>{item.amount}</Table.Cell>,
        <Table.Cell>{item.kind}</Table.Cell>
    ]

    return (item) => [
        <Table.Cell>{item.label}</Table.Cell>,
        <Table.Cell>{item.amount}</Table.Cell>,
        <Table.Cell>{new Date(item.created_at).toLocaleDateString()}</Table.Cell>,
        <Table.Cell>{item.kind}</Table.Cell>
    ]
}

export function SpendingTable({ data, rowsPerPage, size }) {

    const header = useMemo(() => renderHeader(size), [size])
    const renderCells = useMemo(() => renderCellsFactory(size), [size])
    return (<Table
        aria-label="Example table with dynamic content"
        css={{
            height: "auto",
            minWidth: "100%",
        }}
    >
        <Table.Header>
            {header}
        </Table.Header>

        <Table.Body items={data}>
            {(item) => (
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
            onPageChange={(page) => console.log({ page })}
        />
    </Table>)
}