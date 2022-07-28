import {Table, Text} from "@nextui-org/react"

export function SpendingTable({ data,rowsPerPage }) {
    return (<Table
        aria-label="Example table with dynamic content"
        css={{
            height: "auto",
            minWidth: "100%",
        }}
    >
        <Table.Header>
            <Table.Column>LABEL</Table.Column>
            <Table.Column>AMOUNT</Table.Column>
            <Table.Column>DATE</Table.Column>
            <Table.Column>KIND</Table.Column>
        </Table.Header>

        <Table.Body items={data}>
            {(item) => (
                <Table.Row key={item.id}>
                    <Table.Cell>{item.label}</Table.Cell>
                    <Table.Cell>{item.amount}</Table.Cell>
                    <Table.Cell>{new Date(item.created_at).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>{item.kind}</Table.Cell>
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