import React from 'react'
import { pdf } from '@react-pdf/renderer'
import { ContractDocument } from '../components/ContractDocument'

export class ContractGenerator {
  static async downloadSupremeCourtPDF(
    targetAddress: string,
    totalEstimate: number,
    aiProposal: string,
  ) {
    console.log(`Compiling 4K PDF Contract for ${targetAddress}...`)

    const contractDoc = React.createElement(ContractDocument, {
      targetAddress,
      totalEstimate,
      aiProposal,
    })
    const blob = await pdf(contractDoc as unknown as Parameters<typeof pdf>[0]).toBlob()

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `JWorden_Contract_${targetAddress.replace(/\s+/g, '_')}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    return true
  }
}
