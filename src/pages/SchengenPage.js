import React from 'react'

import AppContent from '../components/AppContent'
import requirements from "../placeholders/requirements.json"


export default function SchengenPage() {
  return (
    <AppContent>
      <h1>Requirements to enter to Schengen zone</h1>
      <h4>{requirements.intro}</h4>
      <table>
        <thead>
        </thead>
        <tbody>
          {
            requirements.list.map((req, index) =>
              <tr key={index}>
                <td>{req[0]}</td>
                <th>{req[1]}</th>
              </tr>
            )
          }
        </tbody>
      </table>

      <h1>Some countries from Americas that need Visa to enter Schengen zone	</h1>
      <ul>
        <li>Bolivia</li>
        <li>Cuba</li>
        <li>Dominican Republic</li>
        <li>Ecuador</li>
        <li>Haiti</li>
        <li>Jamaica</li>
      </ul>

      <h1>Schengen Visas</h1>
      <table>
        <thead>
        </thead>
        <tbody>
          <tr>
            <td>Air-transit visa (A visa)</td>
            <th>6 months</th>
          </tr>
          <tr>
            <td>Short-stay visa (C visa)</td>
            <th>5 years</th>
          </tr>
          <tr>
            <td>Long-stay visa (D visa)</td>
            <th>6 months</th>
          </tr>
        </tbody>
      </table>

      <h1>ETIAS (European Travel Information and Authorisation System)</h1>
      <p>It will apply from 2025 to countries that don't require a Visa to enter the Schengen area.</p>
    </AppContent>
  )
}
